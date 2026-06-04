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

const count = await Notification.countDocuments({
  ...query,
  read: false,
});
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


router.get("/", authMiddleware, async (req, res) => {
  try {
    let query = {};

    if (req.user.role === "client") {
      query = {
        userType: "client",
        userId: req.user.id,
      };
    } else {
      query = {
        userType: "admin",
      };
    }

    const notifications = await Notification.find(query).sort({
      createdAt: -1,
    });

    res.json(notifications);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Error",
    });
  }
});


router.put("/read/:id", authMiddleware, async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, {
      read: true,
    });

    res.json({
      message: "Notification marked as read",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Error",
    });
  }
});
module.exports = router;

