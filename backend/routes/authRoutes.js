
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { checkToken } = require('../middleware/authMiddleware');

router.get('/check-availability', authController.checkAvailability);
router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.put('/update-password', checkToken, authController.updatePassword);
router.post('/logout', checkToken, (req, res) => res.json({ msg: 'Logged out successfully' }));

module.exports = router;
