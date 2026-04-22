import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

/* 🔥 REGISTER */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json("User already exists");

    const hashed = await bcrypt.hash(password, 10);

    const adminExists = await User.findOne({ role: "admin" });

    let isApproved = false;

    if (role === "admin") {
      isApproved = adminExists ? false : true; // first admin auto approved
    } else {
      isApproved = true;
    }

    const user = await User.create({
      name,
      email,
      password: hashed,
      role: role || "user",
      isApproved
    });

    res.json({ msg: "Registered", user });

  } catch (err) {
    res.status(500).json("Server error");
  }
});

/* 🔥 LOGIN */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json("Wrong password");

    if (user.role === "admin" && !user.isApproved) {
      return res.status(403).json("Admin not approved yet");
    }

    const token = jwt.sign({ id: user._id }, "secret");

    res.json({ token, user });

  } catch (err) {
    res.status(500).json("Server error");
  }
});

/* 🔥 GET PENDING ADMINS */
router.get("/pending", async (req, res) => {
  const users = await User.find({ role: "admin", isApproved: false });
  res.json(users);
});

/* 🔥 APPROVE ADMIN */
router.put("/approve/:id", async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) return res.json("User not found");

  user.isApproved = true;
  await user.save();

  res.json("✅ Admin approved");
});

export default router;