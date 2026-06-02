const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const app = express();

/* =====================
   MIDDLEWARE
===================== */

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());

/* =====================
   IMAGE STATIC FOLDER
===================== */

app.use("/uploads", express.static("uploads"));


/* =====================
   DEBUG
===================== */

app.use((req, res, next) => {
  console.log("👉 COOKIE:", req.cookies);
  next();
});


/* =====================
   ROUTES
===================== */

const adminRoutes = require("./routes/adminRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require( "./routes/orderRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const adminOrderRoutes =require("./routes/adminOrderRoutes");
const clientRoutes = require("./routes/clientRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

app.use("/api/categories",categoryRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/orders", adminOrderRoutes);
app.use("/api/wishlist",wishlistRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/notifications", notificationRoutes);




/* =====================
   TEST ROUTE
===================== */

app.get("/", (req, res) => {
  res.send("Backend Running Successfully 🚀");
});

/* =====================
   DATABASE CONNECTION
===================== */

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {

    console.log("MongoDB Connected ✅");

  })
  .catch((err) =>
    console.log("DB Error:", err)
  );

/* =====================
   SERVER START
===================== */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});