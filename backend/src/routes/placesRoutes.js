const express = require('express');
const { getAllPlaces, getPlaceById, checkAvailability } = require('../controllers/placesController');
const router = express.Router();

router.get('/', getAllPlaces);
router.get('/:id', getPlaceById);
router.get('/:id/availability', checkAvailability);

module.exports = router;