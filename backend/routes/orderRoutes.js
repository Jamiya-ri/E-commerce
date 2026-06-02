const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const User = require("../models/User");
const Notification = require("../models/Notifications");
const authMiddleware = require("../middleware/authMiddleware");

/* =========================
   CHECKOUT ALL CART PRODUCTS
========================= */

router.post(
  "/checkout",
  authMiddleware,
  async (req, res) => {

    try {

      const {
        customerName,
        phone,
        address,
        paymentMethod,
        city,
        pincode,
        notes,
      } = req.body;

      const cartItems =
        await Cart.find({
          userId: req.user.id,
        }).populate("productId");

      if (!cartItems.length) {

        return res.status(400).json({
          message: "Cart empty",
        });

      }

      const user =
        await User.findById(req.user.id);

      // =========================
      // GROUP PRODUCTS BY VENDOR
      // =========================
      const grouped = {};

      cartItems.forEach((item) => {

        const vendorId =
          item.productId.vendorId.toString();

        if (!grouped[vendorId]) {

          grouped[vendorId] = {
            vendorId,
            shopName:
              item.productId.shopName,
            products: [],
            totalAmount: 0,
          };

        }

        grouped[vendorId].products.push({

          productId:
            item.productId._id,

          quantity:
            item.quantity,

        });

        grouped[vendorId].totalAmount +=
          item.productId.price *
          item.quantity;

      });

      // =========================
      // CREATE MULTIPLE ORDERS
      // =========================
      const createdOrders = [];

      for (const vendor in grouped) {

        const data =
          grouped[vendor];

        const customOrderId =
          `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

        const order =
          await Order.create({

            orderId:
              customOrderId,

            userId:
              req.user.id,

            customerName:
              customerName ||
              user.name,

            phone,

            address,

            city,

            pincode,

            paymentMethod,

            notes,

            products:
              data.products,

            totalAmount:
              data.totalAmount,

            status:
              "Pending",

            vendorId:
              data.vendorId,

            shopName:
              data.shopName,

          });

        createdOrders.push(order);

        await Notification.create({
          userType: "client",

          userId: data.vendorId,

          title: "New Order",

          message: `${customerName || user.name} placed a new order`,
        });

        await Notification.create({
          userType: "admin",

          title: "New Order",

          message: `${customerName || user.name} placed a new order`,
        });

      }

      // =========================
      // CLEAR CART
      // =========================
      await Cart.deleteMany({
        userId: req.user.id,
      });

      res.json({

        message:
          "Orders placed successfully",

        orders:
          createdOrders,

      });

    } catch (err) {

      console.log(
        "CHECKOUT ERROR:",
        err
      );

      res.status(500).json({
        message:
          "Checkout error",
      });

    }

  }
);

/* =========================
   ORDER SINGLE PRODUCT
========================= */
router.post(
  "/single-order/:cartId",
  authMiddleware,
  async (req, res) => {
 
    try {

      const {
        customerName,
        phone,
        address,
        city,
        pincode,
        paymentMethod,
        notes,
      } = req.body;

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
            customerName || user?.name || "Unknown",

          phone,

          address,

          city,

          pincode,

          paymentMethod,

          notes,

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
      
await Notification.create({
  userType: "client",

  userId: cartItem.productId.vendorId,

  title: "New Order",

  message: `${customerName || user?.name || "Customer"} placed a new order`,
});

await Notification.create({
  userType: "admin",

  title: "New Order",

  message: `${customerName || user?.name || "Customer"} placed a new order`,
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