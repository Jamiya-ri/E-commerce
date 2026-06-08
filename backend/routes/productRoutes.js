const express = require("express");

const router = express.Router();

const fs = require("fs");

const path = require("path");

const Product = require("../models/Products");

const Client = require("../models/Client");

const upload = require("../middleware/Uploads");

const authMiddleware = require("../middleware/authMiddleware");

/* =========================
   ADD PRODUCT
========================= */
router.post(
  "/add",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {

    try {

      // =========================
      // ONLY CLIENT
      // =========================
      if (req.user.role !== "client") {

        return res.status(403).json({
          message: "Only client can add product",
        });

      }

      // =========================
      // FIND CLIENT
      // =========================
      const client = await Client.findById(
        req.user.id
      );

      if (!client) {

        return res.status(404).json({
          message: "Client not found",
        });

      }

      // =========================
      // PRODUCT DATA
      // =========================
      const productData = {

        name: req.body.name,

        category:
          req.body.category?.toLowerCase(),

        price: req.body.price,

        brand: req.body.brand,

        stock: req.body.stock,

        status: req.body.status,

        description:
          req.body.description,

        image: req.file
          ? `http://localhost:5000/uploads/${req.file.filename}`
          : "",

        vendorId: client._id,

        shopName: client.shopName,

      };

      // =========================
      // CREATE PRODUCT
      // =========================
      const product =
        await Product.create(productData);

      res.status(201).json(product);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message: "Error adding product",
      });

    }

  }
);

/* =========================
   GET ALL PRODUCTS
========================= */
router.get("/", async (req, res) => {

  try {

    const { category } = req.query;

    let filter = {};

    if (category) {

      filter.category =
        category.toLowerCase();

    }

    const products =
      await Product.find(filter);

    res.json(products);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Error fetching products",
    });

  }

});

/* =========================
   CLIENT MY PRODUCTS
========================= */
router.get(
  "/my-products",
  authMiddleware,
  async (req, res) => {

    try {

      // =========================
      // ONLY CLIENT
      // =========================
      if (req.user.role !== "client") {

        return res.status(403).json({
          message: "Access denied",
        });

      }

      const products =
        await Product.find({

          vendorId: req.user.id,

        });

      res.json(products);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message: "Error fetching products",
      });

    }

  }
);

/* =========================
   UPDATE PRODUCT
========================= */
router.put(
  "/:id",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {

    try {

      const product =
        await Product.findById(
          req.params.id
        );

      if (!product) {

        return res.status(404).json({
          message: "Product not found",
        });

      }

      // =========================
      // ONLY OWNER CLIENT
      // =========================
      if (
        req.user.role !== "client" ||
        product.vendorId.toString() !== req.user.id
      ) {

        return res.status(403).json({
          message: "Unauthorized",
        });

      }

      // =========================
      // IMAGE REPLACE
      // =========================
      let imageUrl = product.image;

      if (req.file) {

        const oldImageName =
          product.image?.split("/uploads/")[1];

        if (oldImageName) {

          const oldImagePath = path.join(
            __dirname,
            "..",
            "uploads",
            oldImageName
          );

          fs.unlink(
            oldImagePath,
            (err) => {

              if (err) {

                console.log(
                  "Old image delete error:",
                  err.message
                );

              }

            }
          );

        }

        imageUrl =
          `http://localhost:5000/uploads/${req.file.filename}`;

      }

      // =========================
      // UPDATED DATA
      // =========================
      const updatedData = {

        name: req.body.name,

        category:
          req.body.category?.toLowerCase(),

        price: req.body.price,

        brand: req.body.brand,

        stock: req.body.stock,

        status: req.body.status,

        description:
          req.body.description,

        image: imageUrl,

      };

      // =========================
      // UPDATE
      // =========================
      const updatedProduct =
        await Product.findByIdAndUpdate(
          req.params.id,
          updatedData,
          {
            new: true,
            runValidators: true,
          }
        );

      res.json(updatedProduct);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message: "Error updating product",
      });

    }

  }
);

/* =========================
   DELETE PRODUCT
========================= */
router.delete(
  "/:id",
  authMiddleware,
  async (req, res) => {

    try {

      const product =
        await Product.findById(
          req.params.id
        );

      if (!product) {

        return res.status(404).json({
          message: "Product not found",
        });

      }

      // =========================
      // ONLY OWNER CLIENT
      // =========================
      if (
        req.user.role !== "client" ||
        product.vendorId.toString() !== req.user.id
      ) {

        return res.status(403).json({
          message: "Unauthorized",
        });

      }

      // =========================
      // DELETE IMAGE
      // =========================
      if (product.image) {

        const imageName =
          product.image.split("/uploads/")[1];

        if (imageName) {

          const imagePath = path.join(
            __dirname,
            "..",
            "uploads",
            imageName
          );

          fs.unlink(
            imagePath,
            (err) => {

              if (err) {

                console.log(
                  "Image delete error:",
                  err.message
                );

              }

            }
          );

        }

      }

      // =========================
      // DELETE PRODUCT
      // =========================
      await Product.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Product deleted successfully",
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message: "Error deleting product",
      });

    }

  }
);

/* =========================
   GET UNIQUE CATEGORIES
========================= */
router.get(
  "/categories/list",
  async (req, res) => {

    try {

      const products =
        await Product.find();

      const categories = [
        ...new Set(
          products.map(
            (item) => item.category
          )
        ),
      ];

      res.json(categories);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message:
          "Category fetch failed",
      });

    }

  }
);
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;