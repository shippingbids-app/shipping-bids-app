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

module.exports.authenticate = (req, res, next) => {
  function invalidAuhtError() {
    next(
      createError(400, {
        message: "User validation failed",
        errors: { email: { message : "Invalid email or password"} }
      })
    )
  }

  const { email, password } = req.body
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        invalidAuhtError()
      } else {
        return user.checkPassword(password).then((match) => {
          if (match) {
            // req.session.userId = user.id
            res.status(201).json(user)
          } else {
            invalidAuhtError()
          }
        })
      }
    })
    .catch(next)
}

module.exports.listUsers = (req, res, next) => {
  User.find()
    .then((users) => res.json(users))
    .catch(next)
}

module.exports.profile = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.json(user)
      } else {
        next(createError(404, "User not found"))
      }
    })
    .catch(next)
}

module.exports.profileUpdate = (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then((user) => res.json(user))
    .catch(next)
}