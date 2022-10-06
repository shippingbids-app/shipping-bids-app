const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { services, capacities} = require("../data")

const offerSchema = new Schema(
  {
    title: {
      type: String,
      required: "Offers require a title",
      trim: true,
    },
    logistics_capacity: {
      type: [
        {
          type: String,
          required: "Logistics capacity is required",
          enum: capacities.map((capacity) => capacity.value),
        },
      ],
      default: [],
    },
    services: {
      type: [
        {
          type: String,
          required: "Service type is required",
          enum: services.map((service) => service.value),
        },
      ],
      default: [],
    },
    author: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    origin: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    destination: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    expiration_date: {
      type: Date,
      required: "Date is required for bids",
    },
    initial_price: {
      type: Number,
      required: "Initial prices is required for bids",
      trim: true,
    },
  },
  { timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      delete ret.__v;
      ret.id = ret._id;
      delete ret._id;
      return ret;
    },
  } }
);

offerSchema.index({ location: "2dsphere" });

const Offer = mongoose.model("Offer", offerSchema);
module.exports = Offer;
