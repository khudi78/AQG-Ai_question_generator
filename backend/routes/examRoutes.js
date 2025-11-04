import express from "express";
import { submitExam } from "../controllers/examController.js";
import Exam from "../models/Exam.js";

const router = express.Router();
router.post("/submit", submitExam);

router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const exams = await Exam.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json({
      message: "User exams fetched successfully",
      exams,
    });
  } catch (error) {
    console.error("Error fetching user exams:", error);
    res.status(500).json({ message: "Failed to fetch exams", error: error.message });
  }
});
export default router;
