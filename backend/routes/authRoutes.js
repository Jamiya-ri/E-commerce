const express = require("express");

const router = express.Router();

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const User = require("../models/User");

const authMiddleware =
  require("../middleware/authMiddleware");

const JWT_SECRET = "secretkey";

/* =========================
   REGISTER
========================= */
router.post(
  "/register",
  async (req, res) => {

    try {

      const {
        name,
        email,
        password,
      } = req.body;

      // =========================
      // VALIDATION
      // =========================
      if (
        !name ||
        !email ||
        !password
      ) {

        return res.status(400).json({

          message:
            "All fields are required",

        });

      }

      // =========================
      // CHECK USER
      // =========================
      const existing =
        await User.findOne({
          email,
        });

      if (existing) {

        return res.status(400).json({

          message:
            "User already exists",

        });

      }

      // =========================
      // HASH PASSWORD
      // =========================
      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      // =========================
      // CREATE USER
      // =========================
      const user =
        await User.create({

          name,

          email,

          password:
            hashedPassword,

          role:
            "customer",

        });

      res.json({

        message:
          "Registered successfully",

        userId:
          user._id,

        name:
          user.name,

      });

    } catch (err) {

      console.log(err);

      res.status(500).json({

        message:
          "Register error",

      });

    }

  }
);

/* =========================
   LOGIN
========================= */
router.post(
  "/login",
  async (req, res) => {

    try {

      const {
        email,
        password,
      } = req.body;

      // =========================
      // FIND USER
      // =========================
      const user =
        await User.findOne({
          email,
        });

      if (!user) {

        return res.status(400).json({

          message:
            "User not found",

        });

      }

      // =========================
      // PASSWORD CHECK
      // =========================
      const isMatch =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!isMatch) {

        return res.status(400).json({

          message:
            "Invalid password",

        });

      }

      // =========================
      // TOKEN
      // =========================
      const token = jwt.sign(

        {
          id: user._id,

          role: user.role,

          name: user.name,

          email: user.email,
        },

        JWT_SECRET,

        {
          expiresIn: "7d",
        }

      );

      // =========================
      // CLEAR OLD TOKENS
      // =========================
      res.clearCookie(
        "adminToken"
      );

      res.clearCookie(
        "clientToken"
      );

      // =========================
      // SAVE CUSTOMER TOKEN
      // =========================
      res.cookie(
        "customerToken",
        token,
        {

          httpOnly: true,

          secure: false,

          sameSite: "lax",

          maxAge:
            7 *
            24 *
            60 *
            60 *
            1000,

        }
      );

      // =========================
      // RESPONSE
      // =========================
      res.json({

        message:
          "Login successful",

        token,

        user: {

          id:
            user._id,

          name:
            user.name,

          email:
            user.email,

          role:
            user.role,

        },

      });

    } catch (err) {

      console.log(err);

      res.status(500).json({

        message:
          "Login error",

      });

    }

  }
);

/* =========================
   GET CURRENT USER
========================= */
router.get(
  "/me",
  authMiddleware,
  async (req, res) => {

    try {

      // =========================
      // ROLE CHECK
      // =========================
      if (
        req.user.role !==
        "customer"
      ) {

        return res.status(403).json({

          message:
            "Access denied",

        });

      }

      const user =
        await User.findById(
          req.user.id
        ).select("-password");

      if (!user) {

        return res.status(404).json({

          message:
            "User not found",

        });

      }

      res.json({

        id:
          user._id,

        name:
          user.name,

        email:
          user.email,

        role:
          user.role,

      });

    } catch (err) {

      console.log(err);

      res.status(500).json({

        message:
          "Error fetching user",

      });

    }

  }
);

/* =========================
   GET ALL USERS
========================= */
router.get(
  "/users",
  authMiddleware,
  async (req, res) => {

    try {

      // =========================
      // ADMIN ONLY
      // =========================
      if (
        req.user.role !==
        "admin"
      ) {

        return res.status(403).json({

          message:
            "Access denied",

        });

      }

      const users =
        await User.find()
          .select("-password");

      res.json(users);

    } catch (err) {

      console.log(err);

      res.status(500).json({

        message:
          "Error fetching users",

      });

    }

  }
);

/* =========================
   LOGOUT
========================= */
router.post(
  "/logout",
  (req, res) => {

    // =========================
    // CLEAR ALL TOKENS
    // =========================
    res.clearCookie(
      "adminToken"
    );

    res.clearCookie(
      "clientToken"
    );

    res.clearCookie(
      "customerToken"
    );

    res.json({

      message:
        "Logged out successfully",

    });

  }
);

module.exports = router;