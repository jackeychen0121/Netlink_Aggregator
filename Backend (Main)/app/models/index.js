const mongoose = require('mongoose');

const db = {};

db.mongoose = mongoose;

db.accounts = require("./account");
db.users = require("./user");
db.emails = require("./admin");

module.exports = db;