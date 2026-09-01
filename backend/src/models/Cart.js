const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  },
  imageUrl: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    default: ''
  },
  artisanId: {
    type: String,
    default: ''
  },
  artisanName: {
    type: String,
    default: 'Master Artisan'
  }
});

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true
    },
    items: [CartItemSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Cart', CartSchema);
