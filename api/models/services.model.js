const mongoose = require("mongoose")
const Schema = mongoose.Schema
const { vehicles, capacities } = require("../data")

const serviceSchema = new Schema(
  {
    // title: {},
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
    location: {
      type: {
        type: String,
        enum: ["Point"],
        // required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
  }
)

const Service = mongoose.model("Service", serviceSchema)
module.exports = Service