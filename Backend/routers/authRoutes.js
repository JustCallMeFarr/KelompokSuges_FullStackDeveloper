const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Pintu Register
router.post('/register', authController.register);
// Pintu Login
router.post('/login', authController.login);

module.exports = router;