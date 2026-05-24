from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import Dict, List, Literal, Any
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url: str = os.environ['MONGO_URL']
client: AsyncIOMotorClient = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app: FastAPI = FastAPI(title="AI Verification Card API")

# Create a router with the /api prefix
api_router: APIRouter = APIRouter(prefix="/api")

@app.get("/")
async def root():
# ==============================
# Status check (legacy)
# ==============================
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


@api_router.get("/")
async def root() -> Dict[str, str]:
    return {"message": "AI Verification Card API is running"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate) -> StatusCheck:
    status_obj = StatusCheck(client_name=input.client_name)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks() -> List[StatusCheck]:
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check.get('timestamp'), str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


# ==============================
# AI Verification Quiz game
# Anonymous submissions only — no PII, no IP logging.
# ==============================
ALLOWED_CHOICE = ("pass", "verify")


class GameAnswer(BaseModel):
    claim_id: str = Field(..., min_length=1, max_length=64)
    choice: Literal["pass", "verify"]
    correct: bool


class GameSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")
    session_id: str = Field(..., min_length=8, max_length=64)
    answers: List[GameAnswer] = Field(..., min_length=1, max_length=50)
    score: int = Field(..., ge=0, le=10000)
    total: int = Field(..., gt=0, le=50)


class GameSubmitResponse(BaseModel):
    ok: bool
    submission_id: str
    correct_count: int
    duplicate: bool = False


class ClaimStat(BaseModel):
    claim_id: str
    total: int
    pass_count: int
    verify_count: int
    pass_pct: float
    verify_pct: float
    correct_pct: float


class GameStatsResponse(BaseModel):
    total_players: int
    average_score: float
    average_correct_pct: float
    claim_stats: List[ClaimStat]
    updated_at: str


@api_router.post("/game/submit", response_model=GameSubmitResponse)
async def submit_game(payload: GameSubmission) -> GameSubmitResponse:
    """Submit an anonymous game result.

    Idempotent on session_id — a second submission with the same session_id is rejected
    silently (returns duplicate=True) to prevent score inflation.
    """
    existing = await db.game_results.find_one(
        {"session_id": payload.session_id}, {"_id": 0, "submission_id": 1}
    )
    if existing:
        return GameSubmitResponse(
            ok=True,
            submission_id=existing.get("submission_id", ""),
            correct_count=0,
            duplicate=True,
        )

    correct_count = sum(1 for a in payload.answers if a.correct)
    submission_id = str(uuid.uuid4())
    doc: Dict[str, Any] = {
        "submission_id": submission_id,
        "session_id": payload.session_id,
        "answers": [a.model_dump() for a in payload.answers],
        "score": int(payload.score),
        "total": int(payload.total),
        "correct_count": correct_count,
        "submitted_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.game_results.insert_one(doc)
    return GameSubmitResponse(
        ok=True,
        submission_id=submission_id,
        correct_count=correct_count,
        duplicate=False,
    )


@api_router.get("/game/stats", response_model=GameStatsResponse)
async def get_game_stats() -> GameStatsResponse:
    """Return aggregated, fully anonymous statistics."""
    total_players = await db.game_results.count_documents({})
    if total_players == 0:
        return GameStatsResponse(
            total_players=0,
            average_score=0.0,
            average_correct_pct=0.0,
            claim_stats=[],
            updated_at=datetime.now(timezone.utc).isoformat(),
        )

    # Aggregate average score + correct%
    overall_pipeline: List[Dict[str, Any]] = [
        {
            "$project": {
                "score": 1,
                "total": 1,
                "correct_count": 1,
                "correct_pct": {
                    "$cond": [
                        {"$gt": ["$total", 0]},
                        {"$multiply": [{"$divide": ["$correct_count", "$total"]}, 100]},
                        0,
                    ]
                },
            }
        },
        {
            "$group": {
                "_id": None,
                "avg_score": {"$avg": "$score"},
                "avg_correct_pct": {"$avg": "$correct_pct"},
            }
        },
    ]
    overall_cur = db.game_results.aggregate(overall_pipeline)
    overall_list = await overall_cur.to_list(1)
    avg_score = float(overall_list[0]["avg_score"]) if overall_list else 0.0
    avg_correct_pct = (
        float(overall_list[0]["avg_correct_pct"]) if overall_list else 0.0
    )

    # Per-claim distribution
    claim_pipeline: List[Dict[str, Any]] = [
        {"$unwind": "$answers"},
        {
            "$group": {
                "_id": "$answers.claim_id",
                "total": {"$sum": 1},
                "pass_count": {
                    "$sum": {"$cond": [{"$eq": ["$answers.choice", "pass"]}, 1, 0]}
                },
                "verify_count": {
                    "$sum": {"$cond": [{"$eq": ["$answers.choice", "verify"]}, 1, 0]}
                },
                "correct_count": {
                    "$sum": {"$cond": ["$answers.correct", 1, 0]}
                },
            }
        },
    ]
    claim_cur = db.game_results.aggregate(claim_pipeline)
    claim_rows = await claim_cur.to_list(100)

    claim_stats: List[ClaimStat] = []
    for row in claim_rows:
        total = int(row.get("total", 0))
        pass_count = int(row.get("pass_count", 0))
        verify_count = int(row.get("verify_count", 0))
        correct_count = int(row.get("correct_count", 0))
        claim_stats.append(
            ClaimStat(
                claim_id=str(row["_id"]),
                total=total,
                pass_count=pass_count,
                verify_count=verify_count,
                pass_pct=round((pass_count / total) * 100, 1) if total else 0.0,
                verify_pct=round((verify_count / total) * 100, 1) if total else 0.0,
                correct_pct=round((correct_count / total) * 100, 1) if total else 0.0,
            )
        )

    # Stable ordering by claim_id
    claim_stats.sort(key=lambda c: c.claim_id)

    return GameStatsResponse(
        total_players=int(total_players),
        average_score=round(avg_score, 2),
        average_correct_pct=round(avg_correct_pct, 1),
        claim_stats=claim_stats,
        updated_at=datetime.now(timezone.utc).isoformat(),
    )


# DEV-only utility to clear data (not exposed via UI). Comment out in production.
@api_router.post("/game/_admin/reset")
async def reset_game_data(secret: str) -> Dict[str, Any]:
    expected = os.environ.get("ADMIN_RESET_SECRET", "")
    if not expected or secret != expected:
        raise HTTPException(status_code=403, detail="Forbidden")
    result = await db.game_results.delete_many({})
    return {"ok": True, "deleted": result.deleted_count}


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger: logging.Logger = logging.getLogger(__name__)


@app.on_event("startup")
async def on_startup() -> None:
    # Ensure unique index on session_id to back the idempotent submit
    try:
        await db.game_results.create_index("session_id", unique=True)
        await db.game_results.create_index("submitted_at")
    except Exception as exc:  # pragma: no cover
        logger.warning("Index creation skipped: %s", exc)


@app.on_event("shutdown")
async def shutdown_db_client() -> None:
    client.close()
