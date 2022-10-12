const { Bid } = require("../models");

module.exports.create = (req, res, next) => {
  Bid.create({
    bid: req.body.bid,
    offer: req.params.offerId,
    user: req.user.id,
  })
    .then((bid) => res.status(201).json(bid))
    .catch(next);
};

module.exports.delete = (req, res, next) => {
  Bid.findByIdAndDelete({id: req.params.id})
    .then(() => res.status(204).send())
    .catch(next);
};