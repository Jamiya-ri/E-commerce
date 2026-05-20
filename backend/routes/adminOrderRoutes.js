const express = require("express");

const router = express.Router();

const Order = require("../models/Order");

const authClient =
  require("../middleware/authClient");
const authMiddleware = require("../middleware/authMiddleware");

  

/* =========================
   GET MY ORDERS
========================= */

router.get(
  "/my-orders",
  authClient,
  async (req, res) => {

    try {

      let orders = [];

      // =========================
      // ADMIN
      // =========================
      if (
        req.user.role === "admin"
      ) {

        orders =
          await Order.find();

      }

      // =========================
      // CLIENT / VENDOR
      // =========================
      else if (
        req.user.role === "client"
      ) {

        orders =
          await Order.find({

            vendorId:
              req.user.id,

          });

      }

      // =========================
      // CUSTOMER / USER
      // =========================
      else {

        orders =
          await Order.find({

            userId:
              req.user.id,

          });

      }

      // =========================
      // POPULATE
      // =========================
      orders =
        await Order.populate(
          orders,
          [

            {
              path: "userId",
              select:
                "name email",
            },

            {
              path:
                "products.productId",
            },

          ]
        );

      // =========================
      // SORT
      // =========================
      orders.sort(
        (a, b) =>

          new Date(
            b.createdAt
          ) -

          new Date(
            a.createdAt
          )
      );

      res.json(orders);

    } catch (err) {

      console.log(err);

      res.status(500).json({

        message:
          "Orders fetch failed",

      });

    }

  }
);

/* =========================
   UPDATE ORDER STATUS
========================= */

router.put(
  "/:id",
  authClient,
  async (req, res) => {

    try {

      const { status } =
        req.body;

      // =========================
      // FIND ORDER
      // =========================
      const order =
        await Order.findById(
          req.params.id
        );

      if (!order) {

        return res.status(404).json({

          message:
            "Order not found",

        });

      }

      // =========================
      // ONLY CLIENT CAN CHANGE
      // =========================
      if (
        req.user.role !==
        "client"
      ) {

        return res.status(403).json({

          message:
            "Only client can update status",

        });

      }

      // =========================
      // CLIENT CAN UPDATE
      // ONLY THEIR ORDERS
      // =========================
      if (
        order.vendorId.toString() !==
        req.user.id
      ) {

        return res.status(403).json({

          message:
            "Unauthorized",

        });

      }

      // =========================
      // UPDATE STATUS
      // =========================
      order.status = status;

      await order.save();

      res.json(order);

    } catch (err) {

      console.log(err);

      res.status(500).json({

        message:
          "Status update failed",

      });

    }

  }
);

/* =========================
   GET ALL ORDERS
========================= */

router.get(
  "/admin-orders",
  authMiddleware,
  async (req, res) => {

    try {

      let orders = [];

      // =========================
      // ADMIN
      // =========================
      if (
        req.user.role === "admin"
      ) {

        orders =
          await Order.find();

      }

      // =========================
      // CLIENT / VENDOR
      // =========================
      else if (
        req.user.role === "client"
      ) {

        orders =
          await Order.find({

            vendorId:
              req.user.id,

          });

      }

      // =========================
      // CUSTOMER / USER
      // =========================
      else {

        orders =
          await Order.find({

            userId:
              req.user.id,

          });

      }

      // =========================
      // POPULATE
      // =========================
      orders =
        await Order.populate(
          orders,
          [

            {
              path: "userId",
              select:
                "name email",
            },

            {
              path:
                "products.productId",
            },

          ]
        );

      // =========================
      // SORT
      // =========================
      orders.sort(
        (a, b) =>

          new Date(
            b.createdAt
          ) -

          new Date(
            a.createdAt
          )
      );

      res.json(orders);

    } catch (err) {

      console.log(err);

      res.status(500).json({

        message:
          "Orders fetch failed",

      });

    }

  }
);

module.exports = router;