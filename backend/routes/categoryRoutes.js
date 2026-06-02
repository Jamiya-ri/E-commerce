const express = require("express");
const router = express.Router();

const Category = require("../models/Category");
const Product = require("../models/Products");

const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");

/* =========================
   ADD CATEGORY
========================= */
router.post("/add", authMiddleware, isAdmin, async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Category name required",
      });
    }

    const existing = await Category.findOne({ name });

    if (existing) {
      return res.status(400).json({
        message: "Category already exists",
      });
    }

    const category = await Category.create({ name });

    res.status(201).json({
      message: "Category added successfully",
      category,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Error adding category",
    });
  }
});

/* =========================
   GET ALL CATEGORIES
========================= */
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find().sort({
      createdAt: -1,
    });

    res.json(categories);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Error fetching categories",
    });
  }
});

/* =========================
   UPDATE CATEGORY
========================= */
router.put("/:id", authMiddleware, isAdmin, async (req, res) => {
  try {
    const { name } = req.body;

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true },
    );

    res.json({
      message: "Category updated successfully",
      category,
    });
  } catch (err) {
    res.status(500).json({
      message: "Update failed",
    });
  }
});

/* =========================
   DELETE CATEGORY
========================= */
router.delete("/:id", authMiddleware, isAdmin, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    await Product.deleteMany({
      category: category.name,
    });

    await Category.findByIdAndDelete(req.params.id);

    res.json({
      message: "Category deleted successfully",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Delete failed",
    });
  }
});

module.exports = router;
