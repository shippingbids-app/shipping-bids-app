const { User } = require("../models");
const createError = require("http-errors");

module.exports.isAuthenticated = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    next(createError(401));
  }
};