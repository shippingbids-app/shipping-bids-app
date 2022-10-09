const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { services, capacities, offerStates } = require("../data");

const offerSchema = new Schema(
  {
    title: {
      type: String,
      required: "Offers require a title",
      trim: true,
    },
    logisticsCapacity: {
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
    // author: {
    //   ref: "User",
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    // },
    author: String,
    originAddress: {
      type: String,
      // required: true,
    },
    origin: {
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
      },
    },
    destinationAddress: {
      type: String,
      // required: true,
    },
    destination: {
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
      },
    },
    expirationDate: {
      type: Date,
      required: "Date is required for bids",
    },
    offerState: {
      type: [
        {
          type: String,
          enum: offerStates.map((offerState) => offerState.value),
        },
      ],
      default: [],
    },
    initialPrice: {
      type: Number,
      required: "Initial prices is required for bids",
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.__v;
        ret.id = ret._id;
        delete ret._id;
        // ret.origin = ret.origin?.coordinates.reverse() || [];
        // ret.destination = ret.destination?.coordinates.reverse() || [];

        return ret;
      },
    },
  }
);

offerSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "offer",
});

offerSchema.virtual("bids", {
  ref: "Bid",
  localField: "_id",
  foreignField: "offer",
});

offerSchema.index({ location: "2dsphere" });

const Offer = mongoose.model("Offer", offerSchema);
module.exports = Offer;
