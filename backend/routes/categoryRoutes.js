const express = require("express");

const router = express.Router();

const Category = require("../models/Category");

const authMiddleware = require("../middleware/authMiddleware");

const isAdmin = require("../middleware/isAdmin");

// =====================================
// ADD CATEGORY
// =====================================
router.post("/add", authMiddleware, isAdmin, async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Category name required",
      });
    }

    // CHECK EXISTING
    const existing = await Category.findOne({
      name,
    });

    if (existing) {
      return res.status(400).json({
        message: "Category already exists",
      });
    }

    // CREATE
    const category = await Category.create({
      name,
    });

    res.status(201).json({
      message: "Category added",
      category,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Error adding category",
    });
  }
});

// =====================================
// GET ALL CATEGORIES
// =====================================
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });

    res.json(categories);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Error fetching categories",
    });
  }
});

module.exports = router;
