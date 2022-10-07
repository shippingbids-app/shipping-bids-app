const { Offer } = require("../models");
const createError = require("http-errors");

module.exports.isOwnedByUser = (req, res, next) => {
  const { id } = req.params;
  Offer.findById(id)
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
