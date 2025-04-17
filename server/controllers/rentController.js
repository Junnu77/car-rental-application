const expressAsyncHandler = require("express-async-handler");
const Car = require("../models/carModel");
const Rental = require("../models/rentalModel");

const calculateDaysBetweenDates = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new Error("Invalid date format");
  }

  if(end <= start) {
    throw new Error("Drop date must be after pickup date");
  }

  const timeDifference = end - start;
  const daysDifference = timeDifference / (1000 * 3600 * 24);
  return Math.ceil(daysDifference);
};

const formatDate = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString('en-GB');
};

const getUserRentals = expressAsyncHandler(async (req, res) => {
  const rentals = await Rental.find({user:req.user._id}).populate('car');
  if(!rentals || rentals.length === 0) {
    res.status(404);
    throw new Error(`No Rental Found for ${req.user.name}!`);
  }
  res.status(200).json(rentals)
});

const getUserRental = expressAsyncHandler(async (req, res) => {
  const rental = await Rental.findById(req.params.rid);
  if(!rental) {
    res.status(404);
    throw new Error("No Rental Found!");
  }
  const car = await Car.findById(rental.car);

  if(!car) {
    res.status(404);
    throw new Error("Car not found!");
  }
  res.status(200).json({
    rental,
    car,
  });
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
    throw new Error("Car not found!");
  }
  
  const existingRental = await Rental.findOne({
    car: req.params.cid,
    $or: [
      {
        $and: [
          { pickupDate: { $lte: dropDate } },
          { dropDate: { $gte: pickupDate } }
        ]
      }
    ]
  });
  if (existingRental) {
    res.status(409); // Conflict status code
    throw new Error(`Car is already booked from ${existingRental.pickupDate} to ${existingRental.dropDate}`);
  }

  let days;
  try {
    days = calculateDaysBetweenDates(pickupDate, dropDate);

    // Ensure minimum 1 day rental
    days = Math.max(1, Math.ceil(days));

    if (days <= 0) {
      throw new Error("Invalid date range");
    }
  } catch (error) {
    res.status(400);
    throw new Error(error.message || "Invalid date format");
  }

  const totalBill = days * carExist.rate;

  // Validate total bill
  if (isNaN(totalBill) || totalBill <= 0) {
    res.status(400);
    throw new Error("Invalid total bill calculation");
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

  res.status(201).json({
    success: true,
    bookingDetails: {
      rentalId: addRental._id,
      carName: updatedStatus.name,
      pickupDate: addRental.pickupDate,
      dropDate: addRental.dropDate,
      totalDays: days,
      totalAmount: addRental.totalBill
    }
  });
});

const updateRental = expressAsyncHandler(async (req, res) => {
  const { pickupDate, dropDate } = req.body;

  // At least one date should be provided
  if (!pickupDate && !dropDate) {
    res.status(400);
    throw new Error("Please provide at least one date to update");
  }

  // First find the rental and populate car details
  const rental = await Rental.findById(req.params.rid).populate('car');

  if (!rental) {
    res.status(404);
    throw new Error("Rental not found");
  }

  // Check if user owns this rental
  if (rental.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized to update this rental");
  }

  // CRITICAL FIX: Ensure all dates are proper Date objects with consistent formatting
  // Parse existing rental dates if they're strings
  const currentPickupDate = typeof rental.pickupDate === 'string'
    ? new Date(rental.pickupDate)
    : rental.pickupDate;

  const currentDropDate = typeof rental.dropDate === 'string'
    ? new Date(rental.dropDate)
    : rental.dropDate;

  // Parse new dates from request
  const newPickupDate = pickupDate
    ? new Date(pickupDate)
    : currentPickupDate;

  const newDropDate = dropDate
    ? new Date(dropDate)
    : currentDropDate;

  // Normalize all dates to start of day for consistent comparison
  newPickupDate.setHours(0, 0, 0, 0);
  newDropDate.setHours(0, 0, 0, 0);

  // Validate date range
  if (newPickupDate >= newDropDate) {
    res.status(400);
    throw new Error("Drop date must be after pickup date");
  }

  // Debug logs with proper date formatting
  console.log("Current rental:", {
    id: rental._id,
    pickupDate: currentPickupDate.toISOString().split('T')[0],
    dropDate: currentDropDate.toISOString().split('T')[0]
  });

  console.log("Requested dates:", {
    newPickupDate: newPickupDate.toISOString().split('T')[0],
    newDropDate: newDropDate.toISOString().split('T')[0]
  });

  // Only look for conflicts if we're actually changing dates
  if (pickupDate || dropDate) {
    // Find existing rentals that overlap with requested dates
    const overlappingRentals = await Rental.find({
      car: rental.car._id,
      _id: { $ne: rental._id }, // Exclude current rental
      $or: [
        // Any overlap scenario
        {
          $and: [
            { pickupDate: { $lt: newDropDate } },
            { dropDate: { $gt: newPickupDate } }
          ]
        }
      ]
    });

    if (overlappingRentals.length > 0) {
      // Sort overlapping rentals by pickup date for consistent reporting
      overlappingRentals.sort((a, b) => new Date(a.pickupDate) - new Date(b.pickupDate));

      const conflictRental = overlappingRentals[0];
      const formattedPickup = new Date(conflictRental.pickupDate).toLocaleDateString();
      const formattedDrop = new Date(conflictRental.dropDate).toLocaleDateString();

      console.log("Conflicting rental:", {
        id: conflictRental._id,
        pickupDate: formattedPickup,
        dropDate: formattedDrop
      });

      res.status(409);
      throw new Error(`Car is already booked from ${formattedPickup} to ${formattedDrop}`);
    }
  }

  // Calculate total bill for new dates
  let days;
  try {
    days = calculateDaysBetweenDates(newPickupDate, newDropDate);
    days = Math.max(1, Math.ceil(days));

    if (days <= 0) {
      throw new Error("Invalid date range");
    }
  } catch (error) {
    res.status(400);
    throw new Error(error.message || "Invalid date format");
  }

  const newBill = days * rental.car.rate;

  // Prepare update object with only changed fields
  const updateFields = {
    totalBill: newBill
  };

  if (pickupDate) updateFields.pickupDate = newPickupDate;
  if (dropDate) updateFields.dropDate = newDropDate;

  // Update the rental
  const updatedRental = await Rental.findByIdAndUpdate(
    req.params.rid,
    updateFields,
    { new: true }
  ).populate('car');

  if (!updatedRental) {
    res.status(400);
    throw new Error("Rental can't be updated");
  }

  res.status(200).json({
    success: true,
    bookingDetails: {
      rentalId: updatedRental._id,
      carName: updatedRental.car.name,
      pickupDate: formatDate(updatedRental.pickupDate),
      dropDate: formatDate(updatedRental.dropDate),
      totalDays: days,
      totalAmount: updatedRental.totalBill
    }
  });
});

module.exports = { getUserRentals, addUserRental, getUserRental, updateRental };
