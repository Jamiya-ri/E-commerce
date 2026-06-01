const express = require("express");

const router = express.Router();

const Wishlist = require("../models/Wishlist");

const authMiddleware = require(
  "../middleware/authMiddleware"
);

/* =========================
   ADD TO WISHLIST
========================= */

router.post(
  "/add",
  authMiddleware,
  async (req, res) => {

    try {

      const { productId } = req.body;

      // CHECK ALREADY EXISTS
      const exists =
        await Wishlist.findOne({
          userId: req.user.id,
          productId,
        });

      if (exists) {

        return res.status(400).json({
          message:
            "Already in wishlist",
        });

      }

      const wishlist =
        await Wishlist.create({

          userId: req.user.id,

          productId,

        });

      res.json(wishlist);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message:
          "Wishlist add error",
      });

    }

  }
);

/* =========================
   GET WISHLIST
========================= */

router.get(
  "/",
  authMiddleware,
  async (req, res) => {

    try {

      const wishlist =
        await Wishlist.find({
          userId: req.user.id,
        }).populate("productId");

      res.json(wishlist);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message:
          "Wishlist fetch error",
      });

    }

  }
);

/* =========================
   REMOVE WISHLIST
========================= */

router.delete(
  "/:id",
  authMiddleware,
  async (req, res) => {

    try {

      await Wishlist.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Wishlist removed",
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message:
          "Wishlist delete error",
      });

    }

  }
);

module.exports = router;