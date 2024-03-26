const mongoose = require("mongoose");

const AdminScema = new mongoose.Schema(
  {
    email: { type: String, unique: true, default: "munim2k@gmail.com" },
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
