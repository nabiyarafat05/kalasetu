const Favourite = require('../models/Favourite');
const Product = require('../models/Product');
const { isConnectedToMongo, memoryStore } = require('../config/db');

/**
 * @route GET /api/favourites
 * @desc Get all favourite craft items for the logged-in user
 */
const getFavourites = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id || '65e000000000000000000002';

    if (isConnectedToMongo()) {
      const favs = await Favourite.find({ userId });
      const productIds = favs.map(f => f.productId);
      const products = await Product.find({ _id: { $in: productIds } });
      return res.json({ success: true, count: products.length, data: products, productIds });
    } else {
      const favProductIds = memoryStore.favourites[userId] || [];
      const products = memoryStore.products.filter(p => favProductIds.includes(p.id) || favProductIds.includes(p._id));
      return res.json({ success: true, count: products.length, data: products, productIds: favProductIds });
    }
  } catch (error) {
    console.error('Get Favourites Error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch favourites' });
  }
};

/**
 * @route POST /api/favourites/:productId
 * @desc Toggle a product in favourites/wishlist
 */
const toggleFavourite = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id || '65e000000000000000000002';
    const { productId } = req.params;

    if (isConnectedToMongo()) {
      const existing = await Favourite.findOne({ userId, productId });
      if (existing) {
        await Favourite.deleteOne({ _id: existing._id });
        return res.json({ success: true, isFavourite: false, message: 'Removed from your wishlist' });
      } else {
        await Favourite.create({ userId, productId });
        return res.json({ success: true, isFavourite: true, message: 'Saved to your wishlist!' });
      }
    } else {
      if (!memoryStore.favourites[userId]) {
        memoryStore.favourites[userId] = [];
      }

      const index = memoryStore.favourites[userId].indexOf(productId);
      if (index > -1) {
        memoryStore.favourites[userId].splice(index, 1);
        return res.json({ success: true, isFavourite: false, message: 'Removed from your wishlist' });
      } else {
        memoryStore.favourites[userId].push(productId);
        return res.json({ success: true, isFavourite: true, message: 'Saved to your wishlist!' });
      }
    }
  } catch (error) {
    console.error('Toggle Favourite Error:', error);
    res.status(500).json({ success: false, message: 'Failed to toggle favourite' });
  }
};

module.exports = {
  getFavourites,
  toggleFavourite
};
