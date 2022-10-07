const { Service } = require("../models")

module.exports.create = (req, res, next) => {
  const service = req.body
  service.author = req.user.id
  Service.create(service)
    .then((service) => res.status(201).json(service))
    .catch(next)
}

module.exports.list = (req, res, next) => {
  Service.find()
  .then((services) => res.json(services))
}

module.exports.detail = (req, res, next) => {
  Service.findById(req.params.id)
    .populate("author", "username")
    .then((service) => res.json(service))
    .catch(next)
}

module.exports.updateService = (req, res, next) => {
  Service.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((service) => res.json(service))
    .catch(next);
};

module.exports.delete = (req, res, next) => {
  Service.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).json())
    .catch(next)
}