const mongoose = require("mongoose")
const Schema = mongoose.Schema
const { vehicles, capacities } = require("../data")

const serviceSchema = new Schema(
  {
    author: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    vehicles: {
      type: [
        {
          type: String,
          required: "Vehicle is required",
          enum: vehicles.map((vehicle) => vehicle.value),
        },
      ],
      default: [],
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
    address: {
      type: String,
      required: true
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
        required: true,
      },
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
        delete ret.password;
        ret.location = ret.location?.coordinates.reverse() || [];

        return ret;
      },
    },
  }
)

const Service = mongoose.model("Service", serviceSchema)
module.exports = Service