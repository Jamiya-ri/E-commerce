const express = require("express");

const router = express.Router();

const Admin = require("../models/Admin");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const JWT_SECRET = "secretkey";

/* =========================================
   ADMIN LOGIN
========================================= */
router.post(
  "/login",
  async (req, res) => {

    try {

      const {
        email,
        password,
      } = req.body;

      // =========================
      // CHECK FIELDS
      // =========================
      if (
        !email ||
        !password
      ) {

        return res.status(400).json({
          message:
            "Email and password required",
        });

      }

      // =========================
      // FIND ADMIN
      // =========================
      const admin =
        await Admin.findOne({
          email,
        });

      if (!admin) {

        return res.status(400).json({
          message:
            "Admin not found",
        });

      }

      // =========================
      // PASSWORD CHECK
      // =========================
      const isMatch =
        await bcrypt.compare(
          password,
          admin.password
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
          id: admin._id,
          role: "admin",
        },

        JWT_SECRET,

        {
          expiresIn: "1d",
        }

      );

      // =========================
      // CLEAR OLD COOKIES
      // =========================
      res.clearCookie(
        "clientToken"
      );

      res.clearCookie(
        "customerToken"
      );

      // =========================
      // SAVE COOKIE
      // =========================
      res.cookie(
        "adminToken",
        token,
        {

          httpOnly: true,

          secure: false,

          sameSite: "lax",

          maxAge:
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
          "Admin login successful",

        token,

        admin: {

          id: admin._id,

          name:
            admin.name,

          email:
            admin.email,

          role:
            "admin",

        },

      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message:
          "Server error",
      });

    }

  }
);

/* =========================================
   CURRENT ADMIN
========================================= */
router.get(
  "/me",
  async (req, res) => {

    try {

      const token =
        req.cookies.adminToken;

      // =========================
      // NO TOKEN
      // =========================
      if (!token) {

        return res.json({
          admin: null,
        });

      }

      // =========================
      // VERIFY TOKEN
      // =========================
      const decoded =
        jwt.verify(
          token,
          JWT_SECRET
        );

      // =========================
      // FIND ADMIN
      // =========================
      const admin =
        await Admin.findById(
          decoded.id
        ).select("-password");

      if (!admin) {

        return res.json({
          admin: null,
        });

      }

      // =========================
      // RESPONSE
      // =========================
      res.json({

        admin: {

          id:
            admin._id,

          name:
            admin.name,

          email:
            admin.email,

          role:
            "admin",

        },

      });

    } catch (err) {

      console.log(err);

      res.json({
        admin: null,
      });

    }

  }
);

/* =========================================
   LOGOUT
========================================= */
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