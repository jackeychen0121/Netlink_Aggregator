const mongoose = require("mongoose");

const User = mongoose.model(
  "admin",
  new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    cookie: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  })
);

module.exports = User;
