const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    userId: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    plainpassword: {
      type: String,
      required: true,
    },

    shopName: {
      type: String,
      required: true,
    },

    

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Client",
  clientSchema
);