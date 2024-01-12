const config = require("../config/auth.config");
const basicConfig = require("../config/basic.config");
const db = require("../models");
const crypto = require("crypto");
const Account = db.accounts;
const User=db.users;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  const user = new Account({
    name: req.body.name,
    email: req.body.email,
    role: 'tpp',
    allowed: false,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  try {
    await user.save();
    res.send({ message: "User was registered Sucessfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
exports.signin4account = async (req, res) => {
  try {

    const accounts = await Account.findOne({
      email: req.body.email,
    });

    if (!accounts) {
      return res.status(404).send({ message: "User Not found." });
    }
    if (accounts.allowed == false) {
      return res.status(404).send({ message: "You are not allowed." });
    }
    const passwordIsValid = bcrypt.compareSync(req.body.password, accounts.password);

    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid Password!" });
    }

    const token = jwt.sign({ id: accounts._id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });
    req.session.token = token;

    res.status(200).send({
      id: accounts._id,
      name: accounts.name,
      email: accounts.email,
      role: accounts.role,
      token: token
    });
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: err.message });
  }
};

exports.signin4user = async (req, res) => {
  try {

    const accounts = await Account.findOne({
      access_token: req.body.accessToken,
      role:"tpp"
    });

    if (!accounts) {
      return res.status(404).send({ message: "Access Token Not found." });
    }
    if (accounts.allowed == false) {
      return res.status(404).send({ message: "This token is not allowed." });
    }

    const token = jwt.sign({ id: accounts._id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });
    res.status(200).send({
      token: token
    });
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: err.message });
  }
};

exports.verify_user = async (req, res) => {
  try {
    jwt.verify(req.body.token, config.secret, async (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      console.log(decoded.id);
      const user = await Account.findById(decoded.id).exec();
      if (user.allowed === true) {
        req.userId = decoded.id;
        res.status(200).send({
          message: "success"
        });
      } else {
        res.status(403).send({ message: 'error' });
      }
    });

  } catch (err) {
    res.status(500).send({ message: 'server error' });
  }
};