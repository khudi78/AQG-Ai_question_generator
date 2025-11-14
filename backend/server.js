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
app.use(cors({
  origin: "*", // Or restrict to your frontend domain
}));
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    // Now define your route
    app.get("/", (req, res) => {
      res.send("Backend running successfully 🚀 & MongoDB Connected 🟢");
    });
      })
  .catch((err) => console.log(err));

      app.get("/status", (req, res) => {
      res.send("hi there");
    });

app.use("/api/questions", questionRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/analyze", analyzeRoutes);
app.use("api/test", testRoutes);
app.use("/api/auth", authRoutes);
console.log("✅ Auth routes mounted");

//app.listen(process.env.PORT, () => console.log(`🚀 Server running on ${process.env.PORT}`));

export default app;

