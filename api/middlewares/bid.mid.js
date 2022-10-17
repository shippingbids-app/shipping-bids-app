const { Offer, Bid } = require("../models");
const createError = require("http-errors");

module.exports.bidIsOwnedByUser = (req, res, next) => {
  const { id } = req.params; 
  
  Bid.findById(id)
    .then((bid) => {
      if (bid) {
        console.log("biduser: " + bid.user._id)
        console.log("user: " + req.user.id)
        if (bid.user._id == req.user.id || req.user.role === "admin") {
           return Bid.findByIdAndDelete(bid.id)
            .then(() => res.status(204).send())          
        } else {
          next(createError(403, "You're not authorized to do this"));
        }
      } else {
        next(createError(404, "Bid not found"));
      }
    })
    .catch(next);
};
