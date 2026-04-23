import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/* 🔥 GENERATE TOKEN */
const generateToken = (id) => {
  return jwt.sign({ id }, "secret", { expiresIn: "7d" });
};

/* 🔥 REGISTER */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check existing user
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json("User already exists ❌");
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user"
    });

    res.json({
      user,
      token: generateToken(user._id)
    });

  } catch (err) {
    res.status(500).json("Server Error");
  }
};

/* 🔥 LOGIN */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json("User not found ❌");
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json("Invalid password ❌");
    }

    res.json({
      user,
      token: generateToken(user._id)
    });

  } catch (err) {
    res.status(500).json("Server Error");
  }
};
import User from "../models/User.js";

// REGISTER
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.create({ name, email, password });

  res.json(user);
};

// LOGIN
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ msg: "User not found" });

  res.json(user);
};