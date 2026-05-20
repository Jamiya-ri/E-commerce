const express = require("express");

const router = express.Router();

const Cart = require("../models/Cart");

const authCustomer = require("../middleware/authCustomer");

/* =========================
   ADD TO CART
========================= */

router.post("/add", authCustomer, async (req, res) => {
  try {
    const { productId } = req.body;

    const userId = req.user.id;

    // CHECK EXISTING
    const existing = await Cart.findOne({
      userId,
      productId,
    });

    if (existing) {
      existing.quantity += 1;

      await existing.save();

      return res.json(existing);
    }

    // CREATE NEW
    const cart = await Cart.create({
      userId,
      productId,
    });

    res.json(cart);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Cart error",
    });
  }
});

/* =========================
   GET USER CART
========================= */

router.get("/", authCustomer, async (req, res) => {
  try {
    const cart = await Cart.find({
      userId: req.user.id,
    }).populate("productId");

    res.json(cart);
  } catch (err) {
    res.status(500).json({
      message: "Fetch cart error",
    });
  }
});

/* =========================
   DELETE CART ITEM
========================= */

router.delete(
  "/:id",
  authCustomer,
  async (req, res) => {
    try {

      await Cart.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message: "Item removed",
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message: "Delete error",
      });

    }
  }
);
/* =========================
   INCREASE QUANTITY
========================= */

router.put(
  "/increase/:id",
  authCustomer,
  async (req, res) => {

    try {

      const cart = await Cart.findById(
        req.params.id
      );

      cart.quantity += 1;

      await cart.save();

      res.json(cart);

    } catch (err) {

      res.status(500).json({
        message: "Increase error",
      });

    }

  }
);


/* =========================
   DECREASE QUANTITY
========================= */

router.put(
  "/decrease/:id",
  authCustomer,
  async (req, res) => {

    try {

      const cart = await Cart.findById(
        req.params.id
      );

      // MINIMUM 1
      if (cart.quantity > 1) {

        cart.quantity -= 1;

        await cart.save();

      }

      res.json(cart);

    } catch (err) {

      res.status(500).json({
        message: "Decrease error",
      });

    }

  }
);

module.exports = router;
