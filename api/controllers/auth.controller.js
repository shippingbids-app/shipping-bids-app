const createError = require("http-errors");
const { User } = require("../models");
const mailer = require("../mail/mailer");

module.exports.profile = (req, res, next) => {
  res.json(req.user);
};

module.exports.register = (req, res, next) => {
  const { email } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        next(
          createError(400, {
            message: "User validation failed",
            error: { email: { message: "User already registered" } },
          })
        );
      } else {
        req.body.image = req.file.path;
        return User.create(req.body).then((user) => {
          mailer.sendWelcome(user);
          res.status(201).json(user);
        });
      }
    })
    .catch(next);
};

module.exports.authenticate = (req, res, next) => {
  function invalidAuhtError() {
    next(
      createError(400, {
        message: "User validation failed",
        errors: { email: { message: "Invalid email or password" } },
      })
    );
  }

  const { email, password } = req.body;
  User.findOne({ email })
    .populate("services")
    .then((user) => {
      if (!user) {
        invalidAuhtError();
      } else {
        return user.checkPassword(password).then((match) => {
          if (match) {
            req.session.userId = user.id;
            res.status(201).json(user);
          } else {
            invalidAuhtError();
          }
        });
      }
    })
    .catch(next);
};

module.exports.listUsers = (req, res, next) => {
  User.find()

    .then((users) => res.json(users))
    .catch(next);
};

module.exports.userProfile = (req, res, next) => {
  User.findById(req.params.id)
    .populate("offers", "title")
    .populate("services")
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        next(createError(404, "User not found"));
      }
    })
    .catch(next);
};

module.exports.userProfileUpdate = (req, res, next) => {
  if (req.file) {
    req.body.image = req.file.path;
  }

  const userData = ({ email, phoneNumber, image, password } = req.body);
  Object.assign(req.user, userData);

  req.user
    .save()
    .then((user) => res.json(user))
    .catch((error) => next(error));
};

module.exports.logout = (req, res, next) => {
  req.session.destroy();
  req.session = null;
  res.status(204).send();
};
