import axios from "axios";

/**
 * ✅ API helper for frontend.
 * Update the BASE_URL if your backend runs on a different host/port.
 */
const BASE_URL =  "https://aqg-ai-question-generator-backend.vercel.app";

const client = axios.create({
  baseURL: BASE_URL + "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * 🧩 Generate Question Paper
 * POST /api/questions/generate
 */
export const generatePaper = async ({ topic, difficulty, num_questions, question_type }) => {
  const res = await client.post("/questions/generate", {
    topic,
    difficulty,
    num_questions,
    question_type,
  });
  return res.data; // returns generated question paper
};

/**
 * 🧠 Submit Exam (saves responses and behavior)
 * POST /api/exams/submit
 */
export const submitExam = async ({ user, topic, difficulty, questions, answers, behaviorReport }) => {
  const res = await client.post("/exams/submit", {
    user,
    topic,
    difficulty,
    questions,
    answers,
    behaviorReport,
  });
  return res.data;
};

/**
 * 📊 Analyze Exam Results (cosine similarity check)
 * POST /api/analyze
 */
export const analyzeExam = async ({ questions, answers }) => {
  const res = await client.post("/analyze", {
    questions,
    answers,
  });
  return res.data; // returns totalScore + detailedScores
};

/**
 * 📚 Fetch all saved exams (optional future feature)
 * GET /api/exams
 */
export const fetchExams = async () => {
  const res = await client.get("/exams");
  return res.data;
};

/**
 * 📋 Fetch exams by user ID
 * GET /api/exams/user/:userId
 */
export const fetchUserExams = async (userId) => {
  const res = await client.get(`/exams/user/${userId}`);
  return res.data.exams;
};


export default {
  generatePaper,
  submitExam,
  analyzeExam,
  fetchExams,
  fetchUserExams,
};
