const express = require("express");

const router = express.Router();

const Notification = require("../models/Notifications");

const authMiddleware = require("../middleware/authMiddleware");

/* =========================
   COUNT
========================= */

router.get("/count", authMiddleware, async (req, res) => {
  try {
    let query = {};

    if (req.user.role === "client") {
      query = {
        userType: "client",

        userId: req.user.id,

        read: false,
      };
    } else {
      query = {
        userType: "admin",

        read: false,
      };
    }

    const count = await Notification.countDocuments(query);

    res.json({
      count,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      count: 0,
    });
  }
});

module.exports = router;
