const mongoose = require("mongoose");

const User = mongoose.model(
  "Device",
  new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    },
  })
);

module.exports = User;
