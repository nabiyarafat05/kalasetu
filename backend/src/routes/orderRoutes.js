const express = require('express');
const router = express.Router();
const {
  createOrder,
  getBuyerOrders,
  getArtisanOrders,
  updateOrderStatus
} = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createOrder);
router.get('/buyer', protect, getBuyerOrders);
router.get('/artisan', protect, getArtisanOrders);
router.patch('/:id/status', protect, updateOrderStatus);

module.exports = router;
