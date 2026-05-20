const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  brand: String,
  stock: Number,
  status: String,
  description: String,
  image: String,
  vendorId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Client",
},
shopName: {
  type: String,
},
});

module.exports = mongoose.model("Product", productSchema);
