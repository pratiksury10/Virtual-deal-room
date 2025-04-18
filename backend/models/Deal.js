const mongoose = require("mongoose");

const dealSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
    default:0,
  },
  status: {
    type: String,
    enum: ["pending", "in progress", "completed", "cancelled"],
    default: "pending",
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },
}, { timestamps: true });

module.exports = mongoose.model("Deal", dealSchema);
