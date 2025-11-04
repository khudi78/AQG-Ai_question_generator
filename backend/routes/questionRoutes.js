import express from "express";
import { generateQuestionPaper,testConnection } from "../controllers/questionController.js";
const router = express.Router();

router.post("/generate", generateQuestionPaper);
router.get("/test", testConnection);

export default router;
