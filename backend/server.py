from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
# XÓA IMPORT MONGODB: from motor.motor_asyncio import AsyncIOMotorClient
# THÊM IMPORT SUPABASE:
from supabase import create_client, Client
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import Dict, List, Literal, Any
import uuid
from datetime import datetime, timezone
# XÓA IMPORT MONGODB: from pymongo.server_api import ServerApi

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# ==============================
# KẾT NỐI DATABASE (THAY THẾ PHẦN NÀY)
# ==============================
# MongoDB cũ:
# mongo_url: str = os.environ['MONGO_URL']
# client: AsyncIOMotorClient = AsyncIOMotorClient(mongo_url, server_api=ServerApi('1'), tlsCAFile=certifi.where())
# db = client[os.environ['DB_NAME']]

# Supabase mới:
SUPABASE_URL = "https://fayfdikejlmjfdkgvvhc.supabase.co"
SUPABASE_KEY = "sb_secret_hYIB7DX70oHWX8LDoT_NhA_j2NEFAJ7" 
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
# Lưu ý: Supabase không có khái niệm 'db' object chung, ta gọi trực tiếp supabase.table()

# Create the main app without a prefix
app: FastAPI = FastAPI(title="AI Verification Card API")

# Create a router with the /api prefix
api_router: APIRouter = APIRouter(prefix="/api")

@app.get("/")
async def root():
    return {"message": "AI Verification Card API is running"}

# ==============================
# Models (GIỮ NGUYÊN)
# ==============================
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# LƯU Ý: Phần Status check dưới đây vẫn đang dùng cú pháp MongoDB (db.status_checks).
# Nếu bạn không dùng tính năng này nữa, hãy để nguyên hoặc xóa. 
# Để code chạy được với Supabase, bạn cần tạo bảng status_checks tương tự trong Supabase.
# Tạm thời mình giữ nguyên để bạn thấy cấu trúc, nhưng nó sẽ lỗi nếu chưa tạo bảng Supabase.

@api_router.get("/")
async def root_router() -> Dict[str, str]:
    return {"message": "AI Verification Card API is running"}

# ==============================
# AI Verification Quiz game (SỬA CÚ PHÁP TRUY VẤN)
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
    """Submit an anonymous game result."""
    
    # SỬA: Thay db.game_results.find_one bằng Supabase select
    existing = supabase.table("game_results").select("id").eq("session_id", payload.session_id).execute()
    
    if existing.data:
        return GameSubmitResponse(
            ok=True,
            submission_id=str(existing.data[0]['id']),
            correct_count=0,
            duplicate=True,
        )

    correct_count = sum(1 for a in payload.answers if a.correct)
    
    # SỬA: Thay db.game_results.insert_one bằng Supabase insert
    data_to_insert = {
        "session_id": payload.session_id,
        "answers": [a.dict() for a in payload.answers],
        "score": int(payload.score),
        "total_questions": int(payload.total), # Đổi tên field cho khớp SQL
        "correct_count": correct_count,
        "submitted_at": datetime.now(timezone.utc).isoformat(),
    }
    
    result = supabase.table("game_results").insert(data_to_insert).execute()
    
    # Supabase tự trả về ID vừa tạo
    new_id = result.data[0]['id'] if result.data else ""

    return GameSubmitResponse(
        ok=True,
        submission_id=str(new_id),
        correct_count=correct_count,
        duplicate=False,
    )


@api_router.get("/game/stats", response_model=GameStatsResponse)
async def get_game_stats() -> GameStatsResponse:
    """Return aggregated, fully anonymous statistics."""
    
    # SỬA: Thay db.game_results.count_documents bằng Supabase count
    count_result = supabase.table("game_results").select("*", count="exact").execute()
    total_players = count_result.count if count_result.count else 0

    if total_players == 0:
        return GameStatsResponse(
            total_players=0,
            average_score=0.0,
            average_correct_pct=0.0,
            claim_stats=[],
            updated_at=datetime.now(timezone.utc).isoformat(),
        )

    # SỬA: Supabase khó aggregate phức tạp như Mongo, ta pull data về rồi tính bằng Python (như code mẫu trước)
    all_results = supabase.table("game_results").select("score, correct_count, total_questions, answers").execute()
    data = all_results.data

    total_score = 0
    total_correct_pct_sum = 0
    claim_map: Dict[str, Dict[str, int]] = {}

    for row in data:
        total_score += row['score']
        if row['total_questions'] > 0:
            total_correct_pct_sum += (row['correct_count'] / row['total_questions']) * 100
        
        answers = row.get('answers', [])
        for ans in answers:
            cid = ans['claim_id']
            if cid not in claim_map:
                claim_map[cid] = {"total": 0, "pass": 0, "verify": 0, "correct": 0}
            
            stat = claim_map[cid]
            stat["total"] += 1
            if ans['choice'] == 'pass': stat["pass"] += 1
            else: stat["verify"] += 1
            if ans['correct']: stat["correct"] += 1

    avg_score = total_score / total_players
    avg_correct_pct = total_correct_pct_sum / total_players

    claim_stats: List[ClaimStat] = []
    for cid, stats in claim_map.items():
        total = stats["total"]
        claim_stats.append(
            ClaimStat(
                claim_id=cid,
                total=total,
                pass_count=stats["pass"],
                verify_count=stats["verify"],
                pass_pct=(stats["pass"] / total) * 100 if total else 0.0,
                verify_pct=(stats["verify"] / total) * 100 if total else 0.0,
                correct_pct=(stats["correct"] / total) * 100 if total else 0.0,
            )
        )

    claim_stats.sort(key=lambda c: c.claim_id)

    return GameStatsResponse(
        total_players=int(total_players),
        average_score=round(avg_score, 2),
        average_correct_pct=round(avg_correct_pct, 1),
        claim_stats=claim_stats,
        updated_at=datetime.now(timezone.utc).isoformat(),
    )


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

# XÓA PHẦN STARTUP/SHUTDOWN CỦA MONGODB vì Supabase không cần tạo index hay close client theo cách đó
