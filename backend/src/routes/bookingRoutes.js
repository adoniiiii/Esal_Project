const express = require("express");
const { addBooking } = require("../controllers/bookingController");
const router = express.Router();

router.post("/bookings", addBooking);

module.exports = router;