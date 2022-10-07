const Comment = require("../models");
const createError = require("http-errors");

module.exports.create = (req, res, next) => {
  Comment.create({
    text: req.body.text,
    stream: req.params.id,
    user: req.user.id,
  })
    .then((comment) => res.status(201).json(comment))
    .catch(next);
};

module.exports.delete = (req, res, next) => {
  Comment.findByIdAndDelete({ _id: req.comment.id })
    .then(() => res.status(204).send())
    .cathc(next);
};
