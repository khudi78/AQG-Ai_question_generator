import axios from "axios";

export const generateQuestionPaper = async (req, res) => {
  try {
    const { topic, difficulty, num_questions, question_type } = req.body;

    // Call Python Flask AI microservice
    const response = await axios.post("http://127.0.0.1:5000/generate-questions", {
      topic,
      difficulty,
      num_questions,
      question_type,
    });

    const data = response.data;

    if (data.status === "success") {
      return res.status(200).json({
        message: "Questions generated successfully",
        ...data,
      });
    } else {
      return res.status(500).json({
        error: data.message || "Failed to generate questions",
      });
    }
  } catch (error) {
    console.error("🔥 AI Generation Error:", error.message);
    return res.status(500).json({
      error: "Failed to connect to AI service",
      details: error.message,
    });
  }
};


// GET /api/questions/test
export const testConnection = async (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      message: "✅ Question route is working perfectly!",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("❌ Test route error:", error.message);
    res.status(500).json({
      status: "error",
      message: "Something went wrong while testing the route",
      details: error.message,
    });
  }
};
