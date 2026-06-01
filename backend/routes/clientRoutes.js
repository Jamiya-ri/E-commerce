const express = require("express");

const router = express.Router();

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const Client = require("../models/Client");

const Product = require("../models/Products");

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const isAdmin = require(
  "../middleware/isAdmin"
);

const JWT_SECRET = "secretkey";

/* =========================================
   ADMIN - CREATE CLIENT
========================================= */
router.post(
  "/create",
  authMiddleware,
  isAdmin,
  async (req, res) => {

    try {

      const {
        name,
        userId,
        password,
        shopName,
      } = req.body;

      // =========================
      // VALIDATION
      // =========================
      if (
        !name ||
        !userId ||
        !password ||
        !shopName
      ) {

        return res.status(400).json({

          message:
            "All fields are required",

        });

      }

      // =========================
      // CHECK EXISTING CLIENT
      // =========================
      const existingClient =
        await Client.findOne({
          userId,
        });

      if (existingClient) {

        return res.status(400).json({

          message:
            "Client already exists",

        });

      }

      // =========================
      // HASH PASSWORD
      // =========================
      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      // =========================
      // CREATE CLIENT
      // =========================
      const client =
        await Client.create({

          name,

          userId,

          password:
            hashedPassword,

          plainpassword:
            password,

          shopName,

          createdBy:
            req.user.id,

        });

      // =========================
      // RESPONSE
      // =========================
      return res.status(201).json({

        message:
          "Client created successfully",

        client,

      });

    } catch (err) {

      console.log(err);

      return res.status(500).json({

        message:
          "Error creating client",

      });

    }

  }
);

/* =========================================
   ADMIN - GET ALL CLIENTS
========================================= */
router.get(
  "/",
  authMiddleware,
  isAdmin,
  async (req, res) => {

    try {

      const clients =
        await Client.find()
          .sort({
            createdAt: -1,
          });

      res.json(clients);

    } catch (err) {

      console.log(
        "CLIENT FETCH ERROR:",
        err
      );

      res.status(500).json({

        message:
          "Error fetching clients",

      });

    }

  }
);

/* =========================================
   CLIENT LOGIN
========================================= */
router.post(
  "/login",
  async (req, res) => {

    try {

      const {
        userId,
        password,
      } = req.body;

      // =========================
      // VALIDATION
      // =========================
      if (
        !userId ||
        !password
      ) {

        return res.status(400).json({

          message:
            "User ID and password required",

        });

      }

      // =========================
      // FIND CLIENT
      // =========================
      const client =
        await Client.findOne({
          userId,
        });

      if (!client) {

        return res.status(400).json({

          message:
            "Client not found",

        });

      }

      // =========================
      // CHECK PASSWORD
      // =========================
      const isMatch =
        await bcrypt.compare(
          password,
          client.password
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
          id: client._id,

          role: "client",

          name: client.name,

          shopName:
            client.shopName,
        },

        JWT_SECRET,

        {
          expiresIn: "7d",
        }

      );

      // =========================
      // CLEAR OLD COOKIES
      // =========================
      res.clearCookie(
        "adminToken"
      );

      res.clearCookie(
        "customerToken"
      );

      // =========================
      // SAVE CLIENT COOKIE
      // =========================
      res.cookie(
        "clientToken",
        token,
        {

          httpOnly: true,

          secure: false,

          sameSite: "lax",

          maxAge:
            7 *
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
          "Client login successful",

        token,

        client: {

          id:
            client._id,

          name:
            client.name,

          userId:
            client.userId,

          shopName:
            client.shopName,

          role:
            "client",

        },

      });

    } catch (err) {

      console.log(err);

      res.status(500).json({

        message:
          "Login error",

      });

    }

  }
);

/* =========================================
   CLIENT PROFILE
========================================= */
router.get(
  "/me",
  authMiddleware,
  async (req, res) => {

    try {

      // =========================
      // CHECK ROLE
      // =========================
      if (
        !req.user ||
        req.user.role !== "client"
      ) {

        return res.status(403).json({

          message:
            "Access denied",

        });

      }

      console.log(
        "CLIENT /me USER:",
        req.user
      );

      const client =
        await Client.findById(
          req.user.id
        ).select("-password");

      if (!client) {

        return res.status(404).json({

          message:
            "Client not found",

        });

      }

      res.json({

        id:
          client._id,

        name:
          client.name,

        userId:
          client.userId,

        shopName:
          client.shopName,

        role:
          "client",

      });

    } catch (err) {

      console.log(err);

      res.status(500).json({

        message:
          "Error fetching profile",

      });

    }

  }
);

/* =========================================
   ADMIN - UPDATE CLIENT
========================================= */
router.put(
  "/:id",
  authMiddleware,
  isAdmin,
  async (req, res) => {

    try {

      const {
        name,
        shopName,
        userId,
        password,
      } = req.body;

      const updateData = {

        name,

        shopName,

        userId,

      };

      // =========================
      // PASSWORD UPDATE
      // =========================
      if (password) {

        const hashedPassword =
          await bcrypt.hash(
            password,
            10
          );

        updateData.password =
          hashedPassword;

        updateData.plainpassword =
          password;

      }

      // =========================
      // UPDATE CLIENT
      // =========================
      const updatedClient =
        await Client.findByIdAndUpdate(
          req.params.id,
          updateData,
          {
            new: true,
          }
        );

      res.json({

        message:
          "Client updated",

        updatedClient,

      });

    } catch (err) {

      console.log(err);

      res.status(500).json({

        message:
          "Update failed",

      });

    }

  }
);

/* =========================================
   ADMIN - DELETE CLIENT + PRODUCTS
========================================= */
router.delete(
  "/:id",
  authMiddleware,
  isAdmin,
  async (req, res) => {

    try {

      // =========================
      // FIND CLIENT
      // =========================
      const client =
        await Client.findById(
          req.params.id
        );

      if (!client) {

        return res.status(404).json({

          message:
            "Client not found",

        });

      }

      // =========================
      // DELETE PRODUCTS
      // =========================
      await Product.deleteMany({

        vendorId:
          client._id,

      });

      // =========================
      // DELETE CLIENT
      // =========================
      await Client.findByIdAndDelete(
        req.params.id
      );

      // =========================
      // RESPONSE
      // =========================
      res.json({

        message:
          "Client and products deleted successfully",

      });

    } catch (err) {

      console.log(err);

      res.status(500).json({

        message:
          "Delete failed",

      });

    }

  }
);

/* =========================================
   CLIENT LOGOUT
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
        "Client logged out",

    });

  }
);

module.exports = router;