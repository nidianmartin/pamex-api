const mongoose = require("mongoose");
const mailer = require("../config/mailer.config");
const User = require("../models/user.model");

module.exports.create = (req, res, next) => {
  const user = new User({
    name: req.body.name,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    avatar: req.body.avatar,
    phoneNumber: req.body.phoneNumber,
    bio: req.body.bio,
  });

  user
    .save()
    .then((user) => {
      mailer.sendValidationEmail({
        name: user.name,
        email: user.email,
        id: user._id.toString(),
        activationToken: user.activation.token,
      });
      res.status(201).json(user);
    })
    .catch(next);
};

module.exports.doLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw createError(400, "missing credentials");
  }

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        throw createError(404, "user not found");
      } else {
        return user.checkPassword(password).then((match) => {
          if (!match) {
            throw createError(400, "invalid password");
          } else {
            req.session.user = user;
            res.json(user);
          }
        });
      }
    })
    .catch(next);
};

module.exports.logout = (req, res) => {
	req.session.destroy();
	res.status(204).json();
  }
