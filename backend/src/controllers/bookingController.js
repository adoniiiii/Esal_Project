const { createBooking } = require("../services/bookingService");

const addBooking = (req, res, next) => {
  try {
    const { yurtId, startDate, endDate, touristName } = req.body;
    const newBooking = createBooking(yurtId, startDate, endDate, touristName);
    res.status(201).json(newBooking);
  } catch (error) {
    next(error);
  }
};

module.exports = { addBooking };