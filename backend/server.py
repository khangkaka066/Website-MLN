const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// ==============================
// 1. Cấu hình Middleware & CORS
// ==============================
app.use(express.json());
app.use(cors({
  origin: process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : '*',
  credentials: true,
  methods: ["*"],
  allowedHeaders: ["*"]
}));

// ==============================
// 2. Kết nối MongoDB
// ==============================
const mongoUrl = process.env.MONGO_URL;
const dbName = process.env.DB_NAME || 'MLN'; // Mặc định là MLN nếu không có biến môi trường
let db;
let client;

async function connectDB() {
  try {
    client = new MongoClient(mongoUrl);
    await client.connect();
    db = client.db(dbName);
    console.log("✅ Connected to MongoDB");
    
    // Tạo index cho session_id để đảm bảo tính duy nhất (tương tự on_startup trong Python)
    await db.collection('game_results').createIndex({ "session_id": 1 }, { unique: true });
    await db.collection('game_results').createIndex({ "submitted_at": 1 });
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
}
connectDB();

// ==============================
// 3. Định nghĩa Routes
// ==============================

// Root check
app.get('/', (req, res) => {
  res.json({ message: "AI Verification Card API is running" });
});

app.get('/api', (req, res) => {
  res.json({ message: "AI Verification Card API is running" });
});

// --- Status Check (Legacy) ---
app.post('/api/status', async (req, res) => {
  try {
    const { client_name } = req.body;
    const statusObj = {
      id: uuidv4(),
      client_name,
      timestamp: new Date().toISOString()
    };
    await db.collection('status_checks').insertOne(statusObj);
    res.json(statusObj);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/status', async (req, res) => {
  try {
    const checks = await db.collection('status_checks').find({}, { projection: { _id: 0 } }).limit(1000).toArray();
    res.json(checks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- AI Verification Quiz Game ---

// Helper: Kiểm tra choice hợp lệ
const ALLOWED_CHOICE = ["pass", "verify"];

// POST /api/game/submit
app.post('/api/game/submit', async (req, res) => {
  try {
    const { session_id, answers, score, total } = req.body;

    // Validate cơ bản (giống Pydantic trong Python)
    if (!session_id || session_id.length < 8) {
      return res.status(400).json({ error: "Invalid session_id" });
    }

    // 1. Kiểm tra trùng lặp session_id (Idempotency)
    const existing = await db.collection('game_results').findOne(
      { session_id: session_id },
      { projection: { _id: 0, submission_id: 1 } }
    );

    if (existing) {
      return res.json({
        ok: true,
        submission_id: existing.submission_id,
        correct_count: 0,
        duplicate: true
      });
    }

    // 2. Tính số câu đúng
    const correct_count = answers.filter(a => a.correct).length;

    // 3. Tạo document để lưu
    const submission_id = uuidv4();
    const doc = {
      submission_id: submission_id,
      session_id: session_id,
      answers: answers,
      score: parseInt(score),
      total: parseInt(total),
      correct_count: correct_count,
      submitted_at: new Date().toISOString()
    };

    // 4. Insert vào DB
    await db.collection('game_results').insertOne(doc);

    res.json({
      ok: true,
      submission_id: submission_id,
      correct_count: correct_count,
      duplicate: false
    });

  } catch (err) {
    // Xử lý lỗi trùng lặp unique index nếu race condition xảy ra
    if (err.code === 11000) {
       return res.json({ ok: true, submission_id: "", correct_count: 0, duplicate: true });
    }
    console.error("Submit error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET /api/game/stats
app.get('/api/game/stats', async (req, res) => {
  try {
    // 1. Đếm tổng số người chơi
    const total_players = await db.collection('game_results').countDocuments();

    if (total_players === 0) {
      return res.json({
        total_players: 0,
        average_score: 0.0,
        average_correct_pct: 0.0,
        claim_stats: [],
        updated_at: new Date().toISOString()
      });
    }

    // 2. Aggregate tính điểm trung bình
    const overallPipeline = [
      {
        $project: {
          score: 1,
          total: 1,
          correct_count: 1,
          correct_pct: {
            $cond: [
              { $gt: ["$total", 0] },
              { $multiply: [{ $divide: ["$correct_count", "$total"] }, 100] },
              0
            ]
          }
        }
      },
      {
        $group: {
          _id: null,
          avg_score: { $avg: "$score" },
          avg_correct_pct: { $avg: "$correct_pct" }
        }
      }
    ];

    const overallResult = await db.collection('game_results').aggregate(overallPipeline).toArray();
    const avg_score = overallResult.length > 0 ? overallResult[0].avg_score : 0.0;
    const avg_correct_pct = overallResult.length > 0 ? overallResult[0].avg_correct_pct : 0.0;

    // 3. Aggregate thống kê từng câu hỏi (claim)
    const claimPipeline = [
      { $unwind: "$answers" },
      {
        $group: {
          _id: "$answers.claim_id",
          total: { $sum: 1 },
          pass_count: {
            $sum: { $cond: [{ $eq: ["$answers.choice", "pass"] }, 1, 0] }
          },
          verify_count: {
            $sum: { $cond: [{ $eq: ["$answers.choice", "verify"] }, 1, 0] }
          },
          correct_count: {
            $sum: { $cond: ["$answers.correct", 1, 0] }
          }
        }
      }
    ];

    const claimRows = await db.collection('game_results').aggregate(claimPipeline).toArray();

    const claim_stats = claimRows.map(row => {
      const total = row.total || 0;
      return {
        claim_id: row._id,
        total: total,
        pass_count: row.pass_count,
        verify_count: row.verify_count,
        pass_pct: total ? Math.round((row.pass_count / total) * 1000) / 10 : 0.0,
        verify_pct: total ? Math.round((row.verify_count / total) * 1000) / 10 : 0.0,
        correct_pct: total ? Math.round((row.correct_count / total) * 1000) / 10 : 0.0
      };
    });

    // Sắp xếp theo claim_id
    claim_stats.sort((a, b) => a.claim_id.localeCompare(b.claim_id));

    res.json({
      total_players: total_players,
      average_score: Math.round(avg_score * 100) / 100,
      average_correct_pct: Math.round(avg_correct_pct * 10) / 10,
      claim_stats: claim_stats,
      updated_at: new Date().toISOString()
    });

  } catch (err) {
    console.error("Stats error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Admin Reset (Optional)
app.post('/api/game/_admin/reset', async (req, res) => {
  const secret = req.query.secret;
  const expected = process.env.ADMIN_RESET_SECRET;
  
  if (!expected || secret !== expected) {
    return res.status(403).json({ detail: "Forbidden" });
  }
  
  const result = await db.collection('game_results').deleteMany({});
  res.json({ ok: true, deleted: result.deletedCount });
});

// ==============================
// 4. Start Server
// ==============================
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
