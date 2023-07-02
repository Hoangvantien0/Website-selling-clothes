const mongoose = require("mongoose");
const Order = require('../models/Order')
const RateSchema = mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
     
    },
    score: {
      type: Number,
    },
    content: {
      type: String,
      default: "User does not write any content",
    },
    status: {
      type: String,
      enum: ["ChuaDuyet",  "DaDuyet"],
      default: 'ChuaDuyet'
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Rate", RateSchema);