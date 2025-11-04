import express from "express";


const router = express.Router();
console.log("📂 authRoutes loaded");

router.get("/testing", (req, res) => {
  console.log("✅ Auth test route hit!");
  res.send("Auth route working!");
});

export default router;