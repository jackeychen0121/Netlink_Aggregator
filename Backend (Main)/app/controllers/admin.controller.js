const db = require("../models");
const Account = db.accounts;

exports.get_all_tpp = async (req, res) => {
  const TPP_list=await Account.find({},{name:1,email:1,role:1,allowed:1});

  res.send({ get_all_tpp: TPP_list});
};

exports.modify_allowance = async (req, res) => {
  await Account.findByIdAndUpdate(req.body.id,{$set:{allowed:!req.body.allowed}});

  res.send({ message:"Successfully updated"});
};