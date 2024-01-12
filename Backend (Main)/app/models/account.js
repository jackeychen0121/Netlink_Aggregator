const mongoose = require("mongoose");

const User = mongoose.model(
  "Account",
  new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    allowed: {
      type: Boolean,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true
    },
    access_token:String
  })
);

module.exports = User;
