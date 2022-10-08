const { Comment } = require("../models");

module.exports.create = (req, res, next) => {
  Comment.create({
    text: req.body.text,
    offer: req.params.offerId,
    user: req.user.id,
  })
    .then((comment) => res.status(201).json(comment))
    .catch(next);
};

module.exports.delete = (req, res, next) => {
  Comment.findByIdAndDelete({ _id: req.comment.id })
    .then(() => res.status(204).send())
    .catch(next);
};
