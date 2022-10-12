const { Offer, Bid } = require("../models");
const createError = require("http-errors");

module.exports.bidIsOwnedByUser = (req, res, next) => {
  const { id } = req.params; //cambio de bidId a só id en liñas 5 e 7

  Bid.findByIdAndDelete(id) //Middleware cambio a andDelete. Borra a bid da DB, non do React. Ao refrescar non apaerece xa, pero sigue dando o erro en consola
    .then((bid) => {
      if (bid) {
        if (bid.user.id == req.user.id) {
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
