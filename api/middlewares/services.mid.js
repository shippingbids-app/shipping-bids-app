const { Service } = require("../models");
const createError = require("http-errors");

module.exports.isOwnedByUser = (req, res, next) => {
  const { serviceId } = req.params;
  Service.findById(serviceId)
    .then((service) => {
      if (service?.author == req.user?.id) {
        req.service = service;
        next();
      } else if (service) {
        next(createError(403, "You're not authorized to do this"));
      } else {
        next(createError(404, "Service not found"));
      }
    })
    .catch(next);
};
