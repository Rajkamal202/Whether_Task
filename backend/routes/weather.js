const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');
const auth = require('../middleware/auth');

router.get('/:city', auth, weatherController.getWeatherForecast);

module.exports = router;

