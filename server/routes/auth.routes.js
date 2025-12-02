// routes/auth.routes.js (temporary debug)
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// TEMP: no validators — test controller alone
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
