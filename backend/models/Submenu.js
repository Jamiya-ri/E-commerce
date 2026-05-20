const mongoose = require("mongoose");

const submenuSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
  },

  slug: {
    type: String,
  },

}, {
  timestamps: true,
});

module.exports = mongoose.model(
  "Submenu",
  submenuSchema
);