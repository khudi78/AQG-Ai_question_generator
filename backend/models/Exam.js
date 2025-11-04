import mongoose from "mongoose";

const examSchema = new mongoose.Schema({
  user: String,
  topic: String,
  difficulty: String,
  questions: Array,
  answers: Array,
  score: Number,
  behaviorReport: Object,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Exam", examSchema);
