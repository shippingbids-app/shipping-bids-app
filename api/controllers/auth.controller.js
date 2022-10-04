const createError = require("http-errors")
const { User } = require("../models")
const mongoose = require("mongoose")

module.exports.register = (req, res, next) => {
  const { email } = req.body 
  User.findOne({ email })
    .then((user) => {
      if (user) {
        next(
          createError(400, {
            message: "User validation failed",
            error: { email: { message: "User already registered"} }
          })
        );
      } else {
        return User.create(req.body).then((user) => res.status(201).json(user))
      }
    })
    .catch(next)
}