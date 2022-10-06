const { Service } = require("../models");
const createError = require("http-errors");

module.exports.isOwnedByUser = (req, res, next) => {
  const { id } = req.params;
  Service.findById(id)
    .then((service) => {
      if (service?.author == req.user?.id) {
        req.service = service;
        next();
      } else if (service) {
        next(createError(403, "You have no permission to be here"));
      } else {
        next(createError(404, "Service not found"));
      }
    })
    .catch(next);
};
