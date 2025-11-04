// routes/analyze.js
import express from "express";
const router = express.Router();

// Utility: compute cosine similarity
function cosineSimilarity(str1, str2) {
  const words1 = str1.toLowerCase().split(/\W+/);
  const words2 = str2.toLowerCase().split(/\W+/);

  const wordSet = new Set([...words1, ...words2]);
  const vector1 = [];
  const vector2 = [];

  for (const word of wordSet) {
    const count1 = words1.filter(w => w === word).length;
    const count2 = words2.filter(w => w === word).length;
    vector1.push(count1);
    vector2.push(count2);
  }

  const dotProduct = vector1.reduce((sum, val, i) => sum + val * vector2[i], 0);
  const magnitudeA = Math.sqrt(vector1.reduce((sum, val) => sum + val * val, 0));
  const magnitudeB = Math.sqrt(vector2.reduce((sum, val) => sum + val * val, 0));

  return magnitudeA && magnitudeB ? (dotProduct / (magnitudeA * magnitudeB)) : 0;
}

// POST /api/analyze
router.post("/", (req, res) => {
  try {
    const { questions, answers } = req.body;

    if (!questions || !answers || questions.length !== answers.length) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const result = [];
    let total = 0;

    for (let i = 0; i < questions.length; i++) {
      const similarity = cosineSimilarity(answers[i], questions[i].answer);
      total += similarity;
      result.push({
        question: questions[i].question,
        correctAnswer: questions[i].answer,
        studentAnswer: answers[i],
        similarity: similarity.toFixed(2)
      });
    }

    const finalScore = (total / questions.length) * 100;

    res.json({
      totalScore: finalScore.toFixed(2),
      detailedScores: result
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
