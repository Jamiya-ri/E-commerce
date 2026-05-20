const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authCustomer = require("../middleware/authCustomer");

const JWT_SECRET = "secretkey";

/* =========================
   REGISTER
========================= */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existing = await User.findOne({ email });

    if (existing) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "customer",
    });

    res.json({
      message: "Registered successfully",
      userId: user._id,
      name: user.name,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Register error" });
  }
});

/* =========================
   LOGIN
========================= */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        name: user.name,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("customerToken", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Login error" });
  }
});

/* =========================
   GET CURRENT USER (PROTECTED)
========================= */
router.get("/me", authCustomer, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching user" });
  }
});

/* =========================
   GET ALL USERS (ADMIN ONLY)
========================= */
router.get("/users", authCustomer, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    const users = await User.find().select("-password");

    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching users" });
  }
});

/* =========================
   LOGOUT
========================= */
router.post("/logout", (req, res) => {
  res.clearCookie("customerToken");

  res.json({
    message: "Logged out successfully",
  });
});

module.exports = router;