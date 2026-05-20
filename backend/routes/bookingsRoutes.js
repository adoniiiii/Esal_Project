const express = require('express');
const { createBooking, getUserBookings, cancelBooking } = require('../controllers/bookingsController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authMiddleware); // Все маршруты bookings требуют авторизации

router.post('/', createBooking);
router.get('/users/me/bookings', getUserBookings);
router.delete('/:id', cancelBooking);

module.exports = router;

