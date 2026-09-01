const mongoose = require('mongoose');

const FavouriteSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    productId: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

FavouriteSchema.index({ userId: 1, productId: 1 }, { unique: true });

module.exports = mongoose.model('Favourite', FavouriteSchema);
