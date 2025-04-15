const express = require("express");
const { getCars, getCar, searchCar } = require("../controllers/carController");

const router = express.Router();

router.get("/", getCars);
router.get("/search", searchCar)
router.get("/:id", getCar);

router.use("/:cid/reviews", require("./reviewRoutes"));

module.exports = router;
