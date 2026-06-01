const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(

  {
    orderId: {
      type: String,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

  customerName: {
  type: String,
  required: true,
},

    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
    },

    shopName: {
      type: String,
    },

    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },

        quantity: Number,
      },
    ],

    totalAmount: Number,

    status: {
      type: String,

      enum: [
        "Pending",
        "Shipping",
        "Delivered",
        "Cancelled",
      ],

      default: "Pending",
    },
customerName: {
  type: String,
},

phone: {
  type: String,
},

address: {
  type: String,
},

city: {
  type: String,
},

pincode: {
  type: String,
},

paymentMethod: {
  type: String,
},

notes: {
  type: String,
},

  },

  {
    timestamps: true,
  }
);

module.exports =
  mongoose.model(
    "Order",
    orderSchema
  );