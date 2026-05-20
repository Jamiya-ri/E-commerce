const express = require("express");
const router = express.Router();

const Order = require("../models/Order");
const Cart = require("../models/Cart");
const User = require("../models/User");

const authCustomer = require("../middleware/authCustomer");

/* =========================
   CHECKOUT ALL CART PRODUCTS
========================= */
router.post("/checkout", authCustomer, async (req, res) => {
  try {
    const cartItems = await Cart.find({
      userId: req.user.id,
    }).populate("productId");

    if (!cartItems.length) {
      return res.status(400).json({
        message: "Cart empty",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // TOTAL AMOUNT
    const totalAmount = cartItems.reduce(
      (acc, item) =>
        acc + item.productId.price * item.quantity,
      0
    );

    // PRODUCTS ARRAY
    const products = cartItems.map((item) => ({
      productId: item.productId._id,
      quantity: item.quantity,
    }));

    const customOrderId = `ORD-${Date.now()}`;

    const order = await Order.create({
      orderId: customOrderId,

      userId: req.user.id,

      customerName: user.name,

      products,

      totalAmount,

      status: "Pending",

      vendorId:
        cartItems[0]?.productId?.vendorId,

      shopName:
        cartItems[0]?.productId?.shopName,
    });

    // CLEAR CART
    await Cart.deleteMany({
      userId: req.user.id,
    });

    res.json({
      message: "Order placed successfully",
      order,
    });

  } catch (err) {

    console.log("CHECKOUT ERROR:", err);

    res.status(500).json({
      message: "Checkout error",
    });

  }
});

/* =========================
   ORDER SINGLE PRODUCT
========================= */
router.post(
  "/single-order/:cartId",
  authCustomer,
  async (req, res) => {

    try {

      const cartItem =
        await Cart.findById(
          req.params.cartId
        ).populate("productId");

      if (!cartItem) {

        return res.status(404).json({
          message: "Cart item not found",
        });

      }

      const user =
        await User.findById(req.user.id);

      const totalAmount =
        cartItem.productId.price *
        cartItem.quantity;

      const customOrderId =
        `ORD-${Date.now()}`;

      const order =
        await Order.create({

          orderId: customOrderId,

          userId: req.user.id,

          customerName:
            user?.name || "Unknown",

          products: [
            {
              productId:
                cartItem.productId._id,

              quantity:
                cartItem.quantity,
            },
          ],

          totalAmount,

          status: "Pending",

          vendorId:
            cartItem.productId.vendorId,

          shopName:
            cartItem.productId.shopName,
        });

      // REMOVE ITEM FROM CART
      await Cart.findByIdAndDelete(
        req.params.cartId
      );

      res.json({
        message:
          "Order placed successfully",

        order,
      });

    } catch (err) {

      console.log(
        "SINGLE ORDER ERROR:",
        err
      );

      res.status(500).json({
        message:
          "Single order error",
      });

    }

  }
);

module.exports = router;