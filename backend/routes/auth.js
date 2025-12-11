const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middlewares/auth');

// Register
router.post('/register', authController.register);
// Login
router.post('/login', authController.login);
// Get profile
router.get('/profile', auth, authController.getProfile);

module.exports = router;
