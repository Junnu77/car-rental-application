const expressAsyncHandler = require("express-async-handler");
const Car = require("../models/carModel");

const getCars = expressAsyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  // Build query object for filtering
  const query = {};

  // Search functionality
  if (req.query.search) {
    query.$or = [
      { name: { $regex: req.query.search, $options: "i" } },
      { company: { $regex: req.query.search, $options: "i" } },
      { description: { $regex: req.query.search, $options: "i" } }
    ];
  }

  // Filter by company
  if (req.query.company) {
    query.company = req.query.company;
  }

  // Filter by rate (price) range
  if (req.query.minRate || req.query.maxRate) {
    query.rate = {};
    if (req.query.minRate) query.rate.$gte = parseInt(req.query.minRate);
    if (req.query.maxRate) query.rate.$lte = parseInt(req.query.maxRate);
  }

  // Filter by availability (isBooked)
  if (req.query.available !== undefined) {
    query.isBooked = req.query.available === 'false';
  }

  // Filter by category
  if (req.query.category) {
    query.category = req.query.category.toLowerCase();
  }

  // Filter by fuel type
  if (req.query.fuelType) {
    query.fuelType = req.query.fuelType.toLowerCase();
  }

  // Filter by transmission
  if (req.query.transmission) {
    query.transmission = req.query.transmission;
  }

  // Filter by seats
  if (req.query.seats) {
    query.seats = parseInt(req.query.seats);
  }

  // Filter by mileage range
  if (req.query.minMileage || req.query.maxMileage) {
    query.mileage = {};
    if (req.query.minMileage) query.mileage.$gte = parseInt(req.query.minMileage);
    if (req.query.maxMileage) query.mileage.$lte = parseInt(req.query.maxMileage);
  }

  // Build sort object
  const sort = {};
  if (req.query.sort) {
    const sortFields = req.query.sort.split(',').map(field => {
      const order = field.startsWith('-') ? -1 : 1;
      const fieldName = field.startsWith('-') ? field.substring(1) : field;
      return { [fieldName]: order };
    });
    Object.assign(sort, ...sortFields);
  }

  // Get total count of cars with filters
  const total = await Car.countDocuments(query);

  // Get paginated cars with filters and sort
  const cars = await Car.find(query)
    .sort(sort)
    .skip(skip)
    .limit(limit);

  if (!cars) {
    res.status(404);
    throw new Error("Cars Not Found");
  }

  res.status(200).json({
    cars,
    pagination: {
      total,
      page,
      pages: Math.ceil(total / limit),
      limit
    },
    filters: {
      search: req.query.search || null,
      company: req.query.company || null,
      category: req.query.category || null,
      fuelType: req.query.fuelType || null,
      transmission: req.query.transmission || null,
      minRate: req.query.minRate || null,
      maxRate: req.query.maxRate || null,
      minMileage: req.query.minMileage || null,
      maxMileage: req.query.maxMileage || null,
      seats: req.query.seats || null,
      available: req.query.available || null
    }
  });
});

const getCar = expressAsyncHandler(async (req, res) => {
  const car = await Car.findById(req.params.id);

  if (!car) {
    res.status(404);
    throw new Error("Car Not Found");
  }

  res.status(200).json(car);
});


const searchCar = expressAsyncHandler(async(req,res)=> {
  const {query} = req.query;
  const results = await Car.find({
    $or: [
      { name: {$regex: query, $options: "i"}},
      {company: {$regex: query, $options:"i"}},
    ],
  });

  if(!results) {
    res.status(404);
    throw new Error("No Cars Here!");
  }
  res.status(200).json(results);
})

module.exports = { getCars, getCar, searchCar };
