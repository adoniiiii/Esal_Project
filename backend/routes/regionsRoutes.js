const express = require('express');
const { getAllRegions } = require('../controllers/regionsController');
const router = express.Router();

router.get('/', getAllRegions);

module.exports = router;