const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/user/:id/balance', userController.getBalance);

module.exports = router;