const { Comment } = require("../models");
const createError = require("http-errors");

module.exports.isComentOwnedByUser = (req, res, next) => {
  const { commentId } = req.params;

  Comment.findById(commentId)
    .then((comment) => {
      if (comment) {
        if (comment.user == req.user.id) {
          req.comment = comment;
          next();
        } else {
          next(createError(403, "You're not authorized to do this"));
        }
      } else {
        next(createError(404, "Comment not found"));
      }
    })
    .catch(next);
};
