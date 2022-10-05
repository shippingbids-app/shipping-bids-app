const Offer = require("../models/offer.model")
const createError = require("http-errors")

module.exports.create = (req, res, next) => {
  const offer = req.body
  offer.author = req.user.id

  Offer.create(offer)
    .then((offer) => res.status(201).json(offer))
    .catch(next)
}

module.exports.list = (req, res, next) => {
  Offer.find()
    .then((offers) => res.json(offers))
    .catch(next)
}

module.exports.detail = (req, res, next) => {
  Offer.findById(req.params.id)
   .then((offer) => {
    if (offer) {
      res.json(offer)
    } else {
      next(createError(404, "Offer not found"))
    }
   })
   .catch(next)
}

module.exports.delete = (req, res, next) => {
  Offer.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).send())
    .catch(next)
}