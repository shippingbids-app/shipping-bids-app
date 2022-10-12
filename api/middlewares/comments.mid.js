const { Comment } = require("../models");
const createError = require("http-errors");

module.exports.isComentOwnedByUser = (req, res, next) => {
  const { id } = req.params;

  Comment.findById(id)
    .then((comment) => {
      if (comment) {
        if (comment.user._id == req.user.id) {
          return Comment.findByIdAndDelete(comment.id)
            .then(() => res.status(204).send())
        } else {
          next(createError(403, "You're not authorized to do this"));
        }
      } else {
        next(createError(404, "Comment not found"));
      }
    })
    .catch(next);
};
