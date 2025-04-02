
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { checkToken } = require('../middleware/authMiddleware');

router.get('/check-availability', authController.checkAvailability);
router.post('/signup', authController.signup);
router.post('/signin', authController.signin);

module.exports = router;
