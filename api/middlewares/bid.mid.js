const { Bid } = require("../models");
const createError = require("http-errors");

module.exports.bidIsOwnedByUser = (req, res, next) => {
  const { bidId } = req.params;

  Bid.findById(bidId)
    .then((bid) => {
      if (bid) {
        if (bid.user == req.user.id) {
          req.bid = bid;
          next();
        } else {
          next(createError(403, "You're not authorized to do this"));
        }
      } else {
        next(createError(404, "Bid not found"));
      }
    })
    .catch(next);
};
