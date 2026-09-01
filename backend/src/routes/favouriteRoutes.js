const express = require('express');
const router = express.Router();
const {
  getFavourites,
  toggleFavourite
} = require('../controllers/favouriteController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getFavourites);
router.post('/:productId', protect, toggleFavourite);

module.exports = router;
