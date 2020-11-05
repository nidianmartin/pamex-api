const mongoose = require("mongoose");
const mailer = require("../config/mailer.config");
const User = require("../models/user.model");

module.exports.create = (req, res, next) => {
  const user = new User({
    ...req.body,
    avatar: req.file ? req.file.path : undefined,
  });

  user
    .save()
    .then((user) => {
      mailer.sendValidationEmail({
        name: user.name,
        email: user.email,
        id: user._id.toString(),
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

module.exports.update = (req, res, next) => {
  const body = req.body

  if (req.file) {
    body.avatar = req.file.path
  }

  User.findByIdAndUpdate(req.params.id, body, { runValidators: true, new: true })
    .then(user => {
      if (user) {
        res.json(user)
      } else {
        throw createError(400, 'User not updated');
      }
    })
    .catch(next)
}

module.exports.profile = (req, res, next) => {
  User.findById(req.params.id)
    .populate("wallet")
    .then((user) => {
			if (user) {
				res.json(user);
			} else {
				throw createError(404, 'User not found');
			}
		})
		.catch(e => next(createError(400, e)));
}

module.exports.logout = (req, res) => {
  req.session.destroy();
  res.status(204).json();
};
