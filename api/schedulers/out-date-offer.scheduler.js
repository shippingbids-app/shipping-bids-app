const { Offer } = require("../models");

module.exports = () => {
  console.log("me ejecuto");

  Offer.updateMany(
    { expirationDate: { $lte: Date.now() } },
    { $set: { offerState: "closed" } }
  );
};
