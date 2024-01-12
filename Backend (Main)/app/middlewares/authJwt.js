const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const Account = db.accounts;

verifyToken = (req, res, next) => {
  let token = req.headers['token'];
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token.slice(7), config.secret, async (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    
    const user = await Account.findById(decoded.id).exec();
    if (user.allowed === true) {
      req.userId = decoded.id;
      next();
    } else {
      res.status(403).send({ message: 'You are not allowed!' });
    }
  });
};

isAdmin = async (req, res, next) => {
  try {
    const user = await Account.findById(req.userId).exec();
    console.log(user);
    if (user.role === 'admin') {
      next();
    } else {
      res.status(403).send({ message: 'Require Admin Role!' });
    }
  } catch (err) {
    res.status(500).send({ message: err });
  }
};


const authJwt = {
  verifyToken,
  isAdmin,
};
module.exports = authJwt;
