import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  topic: String,
  difficulty: String,
  question: String,
  answer: String,
});

export default mongoose.model("Question", questionSchema);
