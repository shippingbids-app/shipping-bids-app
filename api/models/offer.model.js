const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const offerSchema = new Schema(
  {
    title: {
      type: String,
      required: "Offers require a title",
      trim: true,
    },
    product: {
      type: Number,
      required: "Dimmensions are required: length x width x height",
      trim: true,
    },
    author: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    origin: {
      type: String,
      required: "Origin place is required",
      trim: true,
    },
    destination: {
      type: String,
      required: "Destination place is required",
      trim: true,
    },
    date: {
      type: Date,
      required: "Date is required for bids",
    },
    initial_price: {
      type: Number,
      required: "Initial prices is required for bids",
      trim: true,
    },
  },
  { timestamps: true }
);


const Offer = mongoose.model("Offer", offerSchema)
module.exports = Offer