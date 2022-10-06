const createError = require("http-errors")
const { Service } = require("../models")
const mongoose = require("mongoose")

module.exports.create = (req, res, next) => {
  const service = req.body
  service.author = req.user.id
  Service.create(service)
    .then((service) => res.status(201).json(service))
    .catch(next)
}