// src/routes/authRoutes.js
import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js"; // adjust path to your User model

const router = express.Router();
console.log("📂 authRoutes loaded");

router.get("/test", (req, res) => {
  console.log("✅ Auth test route hit!");
  res.send("Auth route working!");
});

// POST /api/auth/signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("📥 Signup Request:", req.body);

    const existing = await User.findOne({ email });
    if (existing) {
      console.log("⚠️ User already exists");
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({ name, email, password });
    await user.save();
    console.log("✅ User created successfully");

    const userSafe = user.toObject();
    delete userSafe.password;
    res.status(201).json({ message: "Signup successful", user: userSafe });
  } catch (err) {
    console.error("❌ Signup error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


// POST /api/auth/signin
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Invalid credentials" });

    const userSafe = user.toObject();
    delete userSafe.password;

    res.status(200).json({ message: "Login successful", user: userSafe });
  } catch (err) {
    console.error("Signin error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
