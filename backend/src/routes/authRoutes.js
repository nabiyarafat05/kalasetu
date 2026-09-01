const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  loginDemo,
  getCurrentUser,
  updateProfile
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/demo', loginDemo);
router.get('/me', protect, getCurrentUser);
router.put('/profile', protect, updateProfile);

module.exports = router;
