const mongoose = require("mongoose");
const Wallet = require("../models/wallet.model");

module.exports.new = (req, res, next) => {
  const wallet = new Wallet({
    ...req.body,
    user: req.currentUser._id.toString(),
    amount: req.amount,
    typeCoin: req.typeCoin,
  });
  wallet
    .save()
    .then((wallet) => {
      res.status(201).json(wallet);
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        error.errors.message = "Please, check the data entered";
        res.json({
          title: "Add new wallet",
          error: error.errors,
          wallet,
          user: req.currentUser,
        });
      } else {
        next(error);
      }
    });
};
module.exports.edit = (req, res, next) => {
  const body = req.body;
  Wallet.findOne({ user: req.currentUser._id.toString(), _id: req.params.id })
    .then((wallet) => {
      if (wallet.user.toString() === req.currentUser._id.toString()) {
        wallet.set(body);
        wallet
          .save()
          .then((wallet) => {
            res.json(wallet);
          })
          .catch(next);
      } else {
        next(error)
      }
    })
    .catch(next);
};
