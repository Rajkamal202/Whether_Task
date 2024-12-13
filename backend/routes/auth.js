const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Ensure routes are prefixed with /api/auth from server.js
router.post('/signup', authController.signup);
router.post('/login', authController.login);

module.exports = router;



