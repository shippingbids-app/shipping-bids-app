const mongoose = require("mongoose");
const Offer = require("../models/offer.model");
const createError = require("http-errors");

module.exports.create = (req, res, next) => {
  const { lat, lng } = req.body;
  const offer = req.body;
  offer.author = req.user.id;

  if (lat && lng) {
    (offer.origin = {
      type: "Point",
      coordinates: [lng, lat],
    }),
      (offer.destination = {
        type: "Point",
        coordinates: [lng, lat],
      });
  }
  Offer.create(offer)
    .then((offer) => res.status(201).json(offer))
    .catch(next);
};

module.exports.list = (req, res, next) => {
  const { lat, lng } = req.query;
  const criterial = {};
  if (lat && lng) {
    criterial.origin = {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [lng, lat],
        },
        $maxDistance: 50000, //distancia en metros
        // $minDistance: si queda a 0 se puede eliminar
      },
    };
  }

  Offer.find(criterial)
    .then((offers) => res.json(offers))
    .catch(next);
};

module.exports.detail = (req, res, next) => {
  Offer.findById(req.params.id)
    .populate("author", "username")
    .populate({
      path: "bids",
      populate: {
        path: "user",
      },
    })
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    })
    .then((offer) => {
      if (offer) {
        res.json(offer);
      } else {
        next(createError(404, "Offer not found"));
      }
    })
    .catch(next);
};

module.exports.delete = (req, res, next) => {
  Offer.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).send())
    .catch(next);
};
