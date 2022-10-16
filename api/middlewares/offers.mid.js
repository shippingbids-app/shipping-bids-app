const { Offer } = require("../models");
const createError = require("http-errors");

module.exports.isOwnedByUser = (req, res, next) => {
  const { offerId } = req.params;
  Offer.findById(offerId)
    .then((offer) => {
      if (offer?.author == req.user?.id) {
        req.offer = offer;
        next();
      } else if (offer) {
        next(createError(403, "You're not authorized to do this"));
      } else {
        next(createError(404, "Offer not found"));
      }
    })
    .catch(next);
};

module.exports.authorCanNotMakeBids = (req, res, next) => {
  const { offerId } = req.params;
  Offer.findById(offerId)
    .then((offer) => {
      if (offer?.author != req.user?.id) {
        req.offer = offer;
        next();
      } else if (offer) {
        next(createError(403, "You're not authorized to do this"));
      } else {
        next(createError(404, "Offer not found"));
      }
    })
    .catch(next);
};

module.exports.bidIsValidPrice = (req, res, next) => {
  const { offerId } = req.params;
  Offer.findById(offerId)
    .then((offer) => {
      if (offer?.initialPrice > req.body.bid) {
        next();
      } else {
        next(createError(400, "The bid can't be over the initial price"))
      }
    })
    .catch(next);
};