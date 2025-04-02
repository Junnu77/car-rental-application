const expressAsyncHandler = require("express-async-handler");
const Car = require("../models/carModel");
const Rental = require("../models/RentalModel");

const calculateDaysBetweenDates = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start) || isNaN(end)) {
      throw new Error("Invalid date format");
  }

  const timeDifference = end - start;
  const daysDifference = timeDifference / (1000 * 3600 * 24);
  return daysDifference;
};

const getUserRentals = expressAsyncHandler(async (req, res) => {
  const rentals = await Rental.find({user:req.user._id});
  if(!rentals) {
    res.status(404);
    throw new Error("No Rental Found!");
  }
  res.status(200).json(rentals)
});

const getUserRental = expressAsyncHandler(async (req, res) => {
  const rental = await Rental.findById(req.params.rid);
  if(!rental) {
    res.status(404);
    throw new Error("No Rental Found!");
  }
  res.status(200).json(rental);
});

const addUserRental = expressAsyncHandler(async (req, res) => {
  const { pickupDate, dropDate } = req.body;

  if (!pickupDate || !dropDate) {
    res.status(400);
    throw new Error("Please Fill Pickup & Drop Date");
  }

  // Check if params car exist
  const carExist = await Car.findById(req.params.cid);

  if (!carExist) {
    res.status(400);
    throw new Error("Invalid Car Request");
  }

  //  Fix This
  let days = calculateDaysBetweenDates(pickupDate, dropDate);
  let totalBill = Number(days * carExist.rate);

  if (carExist.isBooked) {
    res.status(400);
    throw new Error("Car is already booked!");
  }

  const newRental = {
    user: req.user._id,
    car: req.params.cid,
    pickupDate,
    dropDate,
    totalBill,
  };

  // Create Rental
  const addRental = await Rental.create(newRental);
  // Update Car Status
  const updatedStatus = await Car.findByIdAndUpdate(
    req.params.cid,
    { isBooked: true },
    { new: true }
  );

  if (!addRental || !updatedStatus) {
    res.status(400);
    throw new Error("Car Not Booked");
  }

  res.status(200).json({
    rental: addRental,
    car: updatedStatus,
  });
});

const updateRental = async (req, res) => {
  const {dropDate} = req.body
  if(!dropDate) {
    res.status(400);
    throw new Error("Kindly provide drop-date");
  }

  const rental = await Rental.findById(req.params.rid);
  console.log(rental)
  const car = await Car.findById(rental.car)

  const newBill = calculateDaysBetweenDates(rental.pickupDate, dropDate) * car.rate;

  const updatedRental = await Rental.findByIdAndUpdate(req.params.rid, {dropDate:dropDate, totalBill:newBill}, {new : true})

  if(!updatedRental) {
    res.status(400);
    throw new Error("Rental not updated!");
  }
  res.status(200).json(updatedRental)
};

module.exports = { getUserRentals, addUserRental, getUserRental, updateRental };
