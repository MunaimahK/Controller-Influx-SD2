const mongoose = require("mongoose");
require("dotenv");

const AdminScema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      default: `${process.env.DEFAULT_EMAIL}`,
    },
    username: { type: String, required: true },
    password: { type: String, required: true },
    resetToken: String,
    resetTokenExpiry: Date,
  },
  {
    collection: "admin",
  }
);

const AdminModel = mongoose.model("admins", AdminScema);

module.exports = AdminModel;
