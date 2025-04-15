const { mongoose } = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    fuelType: {
      type: String,
      enum: ["petrol", "diesel", "cng", "ev"],
      required: true,
    },
    category: {
      type: String,
      enum: ["hatchback", "suv", "sedan", "coupe", "jeep"],
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
    isBooked: {
      type: Boolean,
      required: true,
      default: false,
    },
    mileage: {
      type: Number,
      required: true,
    },
    seats:{
      type: Number,
      required: true,
    },
    transmission: {
      type: String,
      enum: ["Automatic","Manual"],
      required: true,
    },
    registration: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    image:{
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Car", carSchema);
