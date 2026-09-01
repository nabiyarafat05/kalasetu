const Cart = require('../models/Cart');
const { isConnectedToMongo, memoryStore } = require('../config/db');

/**
 * @route GET /api/cart
 * @desc Get items in current user's shopping cart
 */
const getCart = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id || '65e000000000000000000002';

    if (isConnectedToMongo()) {
      let cart = await Cart.findOne({ userId });
      if (!cart) {
        cart = await Cart.create({ userId, items: [] });
      }
      return res.json({ success: true, data: cart.items });
    } else {
      if (!memoryStore.carts[userId]) {
        memoryStore.carts[userId] = [];
      }
      return res.json({ success: true, data: memoryStore.carts[userId] });
    }
  } catch (error) {
    console.error('Get Cart Error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch cart' });
  }
};

/**
 * @route POST /api/cart
 * @desc Add item or update quantity in shopping cart
 */
const addToCart = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id || '65e000000000000000000002';
    const { productId, name, price, quantity = 1, imageUrl, category, artisanId, artisanName } = req.body;

    if (!productId || !name || price === undefined) {
      return res.status(400).json({ success: false, message: 'Product details are required.' });
    }

    const itemPayload = {
      productId: productId.toString(),
      name,
      price: Number(price),
      quantity: Number(quantity),
      imageUrl: imageUrl || '',
      category: category || 'Handicraft',
      artisanId: artisanId || '65e000000000000000000001',
      artisanName: artisanName || 'Master Artisan'
    };

    if (isConnectedToMongo()) {
      let cart = await Cart.findOne({ userId });
      if (!cart) {
        cart = new Cart({ userId, items: [] });
      }

      const existingIndex = cart.items.findIndex(it => it.productId === itemPayload.productId);
      if (existingIndex > -1) {
        cart.items[existingIndex].quantity += itemPayload.quantity;
      } else {
        cart.items.push(itemPayload);
      }

      await cart.save();
      return res.json({
        success: true,
        message: 'Product added to your cart!',
        data: cart.items
      });
    } else {
      if (!memoryStore.carts[userId]) {
        memoryStore.carts[userId] = [];
      }

      const existingIndex = memoryStore.carts[userId].findIndex(it => it.productId === itemPayload.productId);
      if (existingIndex > -1) {
        memoryStore.carts[userId][existingIndex].quantity += itemPayload.quantity;
      } else {
        memoryStore.carts[userId].push(itemPayload);
      }

      return res.json({
        success: true,
        message: 'Product added to your cart!',
        data: memoryStore.carts[userId]
      });
    }
  } catch (error) {
    console.error('Add to Cart Error:', error);
    res.status(500).json({ success: false, message: 'Failed to update cart', error: error.message });
  }
};

/**
 * @route DELETE /api/cart/:productId
 * @desc Remove specific item from cart
 */
const removeFromCart = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id || '65e000000000000000000002';
    const { productId } = req.params;

    if (isConnectedToMongo()) {
      const cart = await Cart.findOne({ userId });
      if (cart) {
        cart.items = cart.items.filter(it => it.productId !== productId);
        await cart.save();
        return res.json({ success: true, message: 'Item removed from cart', data: cart.items });
      }
      return res.json({ success: true, data: [] });
    } else {
      if (memoryStore.carts[userId]) {
        memoryStore.carts[userId] = memoryStore.carts[userId].filter(it => it.productId !== productId);
        return res.json({ success: true, message: 'Item removed from cart', data: memoryStore.carts[userId] });
      }
      return res.json({ success: true, data: [] });
    }
  } catch (error) {
    console.error('Remove from Cart Error:', error);
    res.status(500).json({ success: false, message: 'Failed to remove item from cart' });
  }
};

/**
 * @route DELETE /api/cart
 * @desc Clear all items from shopping cart
 */
const clearCart = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id || '65e000000000000000000002';

    if (isConnectedToMongo()) {
      await Cart.findOneAndUpdate({ userId }, { items: [] });
    } else {
      memoryStore.carts[userId] = [];
    }

    return res.json({ success: true, message: 'Cart cleared successfully', data: [] });
  } catch (error) {
    console.error('Clear Cart Error:', error);
    res.status(500).json({ success: false, message: 'Failed to clear cart' });
  }
};

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  clearCart
};
