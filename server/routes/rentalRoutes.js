const express = require("express");
const {
  getUserRentals,
  getUserRental,
  addUserRental,
  updateRental,
} = require("../controllers/rentController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getUserRentals);
router.get("/:rid", protect, getUserRental);
router.post("/:cid", protect, addUserRental);
router.put("/:rid", protect, updateRental);

module.exports = router;
