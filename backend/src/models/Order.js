const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
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

const OrderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true
    },
    buyerId: {
      type: String,
      required: true
    },
    buyerName: {
      type: String,
      required: true
    },
    buyerEmail: {
      type: String,
      required: true
    },
    buyerPhone: {
      type: String,
      default: ''
    },
    items: [OrderItemSchema],
    totalAmount: {
      type: Number,
      required: true
    },
    directArtisanShare: {
      type: Number,
      default: 0
    },
    shippingAddress: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, default: 'India' }
    },
    paymentMethod: {
      type: String,
      enum: ['cod', 'upi', 'card', 'direct_artisan_request'],
      default: 'cod'
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending'
    },
    orderStatus: {
      type: String,
      enum: ['placed', 'confirmed', 'in_crafting', 'dispatched', 'delivered', 'cancelled'],
      default: 'placed'
    },
    notes: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);
