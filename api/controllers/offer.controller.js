const createError = require("http-errors");
const { Offer } = require("../models");

module.exports.create = (req, res, next) => {
  const { origin, destination } = req.body;
  const offer = req.body;
  offer.author = req.user.id;

  if (origin) {
    offer.origin = {
      type: "Point",
      coordinates: origin.reverse()
    }
  }
  if (destination) {
    offer.destination = {
      type: "Point",
      coordinates: destination.reverse()
    }
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
        $maxDistance: 50000, 
      },
    };
  }

  Offer.find(criterial)
    .populate("author", "username")
    .then((offers) => res.json(offers))
    .catch(next);
};

module.exports.detail = (req, res, next) => {
  Offer.findById(req.params.offerId)
    .populate("author", "username")
    .populate({
      path: "bids",
      populate: {
        path: "user",
        select: "username vehicles id rating"
      },
    })
    .populate({
      path: "comments",
      populate: {
        path: "user",
        select: "username email id rating"
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
  Offer.findByIdAndDelete(req.params.offerId)
    .then(() => res.status(204).send())
    .catch(next);
};
