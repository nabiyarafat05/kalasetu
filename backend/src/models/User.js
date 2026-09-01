const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required']
    },
    role: {
      type: String,
      enum: ['artisan', 'buyer', 'admin'],
      default: 'artisan'
    },
    craftSpecialty: {
      type: String,
      default: 'Traditional Indian Handicrafts'
    },
    craftLineage: {
      type: String,
      default: 'Multi-generational family handicraft tradition'
    },
    experienceYears: {
      type: Number,
      default: 15
    },
    bio: {
      type: String,
      default: 'Dedicated to preserving authentic Indian handicrafts, sustainable materials, and empowering local artisan collectives.'
    },
    location: {
      type: String,
      default: 'Jaipur, Rajasthan'
    },
    region: {
      type: String,
      default: 'Rajasthan'
    },
    phone: {
      type: String,
      default: '+91 98765 43210'
    },
    avatar: {
      type: String,
      default: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80'
    },
    shippingAddress: {
      fullName: String,
      phone: String,
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: { type: String, default: 'India' }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
