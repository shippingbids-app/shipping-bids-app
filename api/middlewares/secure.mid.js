const createError = require("http-errors");

module.exports.isAuthenticated = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    next(createError(401));
  }
};

module.exports.profileIsOwnedByUser = (req, res, next) => {
  if (req.user.id === req.params.id) {
    next();
  } else {
    next(createError(401))
  }
}