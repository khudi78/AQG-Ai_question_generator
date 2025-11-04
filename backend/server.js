import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import questionRoutes from "./routes/questionRoutes.js";
import examRoutes from "./routes/examRoutes.js";
import analyzeRoutes from "./routes/analyze.js";
import authRoutes from "./routes/authRoutes.js";
import testRoutes from "./routes/tester.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/api/questions", questionRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/analyze", analyzeRoutes);
app.use("api/test", testRoutes);
app.use("/api/auth", authRoutes);
console.log("✅ Auth routes mounted");

app.listen(process.env.PORT, () => console.log(`🚀 Server running on ${process.env.PORT}`));
