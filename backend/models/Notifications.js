const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    userType: {
      type: String,
      enum: ["admin", "client"],
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
    },

    title: String,

    message: String,

    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Notification", notificationSchema);
