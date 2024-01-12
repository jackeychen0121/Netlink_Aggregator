const db = require("../models");
const Account = db.accounts;

const checkDuplicateAccountnameOrEmail = (req, res, next) => {
  Account.findOne({ name: req.body.name })
    .then(user => {
      if (user) {
        res.status(400).send({ message: "Failed! Username is already in use!" });
        return;
      }

      // Email
      Account.findOne({ email: req.body.email })
        .then(user => {
          if (user) {
            res.status(400).send({ message: "Failed! Email is already in use!" });
            return;
          }
          next();
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

const verifySignUp = {
  checkDuplicateAccountnameOrEmail
};

module.exports = verifySignUp;
