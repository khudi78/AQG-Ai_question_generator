import axios from "axios";
import Exam from "../models/Exam.js";
import User from "../models/User.js";

// URL of your Python cosine similarity microservice
const AI_SERVICE_URL = "https://briz-02-question-generator-api.hf.space/similarity";

export const submitExam = async (req, res) => {
  try {
    const { user, topic, difficulty, questions, answers, behaviorReport } = req.body;

    if (!questions || !answers || questions.length !== answers.length) {
      return res.status(400).json({ message: "Questions and answers mismatch." });
    }

    let score = 0;
    const evaluated = [];

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      const userAnswer = (answers[i] || "").trim().toLowerCase();
      const correctAnswer = (q.answer || "").trim().toLowerCase();

      let similarity = null;
      let isCorrect = false;
      console.log("q.type", q.type);
      if (q.type === "subjective") {
        // Call Python service for cosine similarity
        try {
          const response = await axios.post(AI_SERVICE_URL, {
            answer1: userAnswer,
            answer2: correctAnswer,
          });
          similarity = response.data.cosine_similarity;
         console.log("similarity", similarity);
          // Mark as correct if similarity >= 0.5 (you can adjust threshold)
          isCorrect = similarity >= 0.6;
        } catch (err) {
          console.error("Error calling AI service:", err.message);
          similarity = 0;
          isCorrect = false;
        }
      } else {
        // Objective type: direct comparison
        isCorrect = userAnswer === correctAnswer;
        similarity = isCorrect ? 1 : 0;
      }

      if (isCorrect) score++;

      evaluated.push({
        question: q.question,
        correctAnswer: q.answer,
        userAnswer: answers[i],
        type: q.type || "objective",
        options: q.options || [],
        similarity,
        isCorrect,
      });
    }

    // Save exam result
    const newExam = new Exam({
      user,
      topic,
      difficulty,
      questions,
      answers,
      score,
      behaviorReport,
    });

    await newExam.save();

    // Send full analysis
    return res.json({
      message: "Exam submitted successfully",
      status: "success",
      score,
      total: questions.length,
      topic,
      difficulty,
      behaviorReport,
      details: evaluated, // includes similarity per question
    });
  } catch (error) {
    console.error("Error submitting exam:", error);
    res.status(500).json({
      message: "Internal server error while submitting exam",
      error: error.message,
    });
  }
};
