/**
 * server.js
 * ─────────
 * Express entry point for the AI Career Copilot backend.
 * Exposes POST /api/generate-roadmap
 */

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { buildPrompt } = require("./promptBuilder");
const { init: initGemini } = require("./geminiService");
const { generateWithRetry } = require("./retryHandler");

const app = express();
const PORT = process.env.PORT || 3001;

// ─── Middleware ──────────────────────────────────────────────
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
    ],
  })
);
app.use(express.json());

// ─── Health check ───────────────────────────────────────────
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ─── Required fields for the form payload ────────────────────
const REQUIRED_FIELDS = [
  "age",
  "current_skill_level",
  "current_skills",
  "target_role",
  "weekly_hours_available",
  "timeline_goal",
  "learning_preference",
  "course_preference",
  "paid_course_ok",
];

// ─── POST /api/generate-roadmap ─────────────────────────────
app.post("/api/generate-roadmap", async (req, res, next) => {
  try {
    const body = req.body;

    // Validate required fields
    const missing = REQUIRED_FIELDS.filter(
      (f) => body[f] === undefined || body[f] === null || body[f] === ""
    );
    if (missing.length > 0) {
      return res.status(400).json({
        error: "Missing required fields",
        missing_fields: missing,
      });
    }

    console.log(
      `\n📥 Received roadmap request for target role: "${body.target_role}"`
    );

    // Build prompt → call Gemini with retries → return validated response
    const prompt = buildPrompt(body);
    const roadmap = await generateWithRetry(prompt);

    console.log("📤 Sending validated roadmap to frontend.\n");
    res.json({ success: true, data: roadmap });
  } catch (err) {
    next(err);
  }
});

// ─── Global error handler ───────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error("❌ Server error:", err.message);
  res.status(500).json({
    success: false,
    error: "Failed to generate roadmap. Please try again.",
    details:
      process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// ─── Start ──────────────────────────────────────────────────
try {
  initGemini();
} catch (err) {
  console.error("❌ Failed to initialise Gemini:", err.message);
  process.exit(1);
}

app.listen(PORT, () => {
  console.log(`\n🚀 AI Career Copilot backend running on http://localhost:${PORT}`);
  console.log(`   POST /api/generate-roadmap\n`);
});
