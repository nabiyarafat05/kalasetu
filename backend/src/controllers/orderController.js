const Order = require('../models/Order');
const { isConnectedToMongo, memoryStore } = require('../config/db');

/**
 * Helper to generate order number
 */
const generateOrderNumber = () => {
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const timestamp = Date.now().toString().slice(-4);
  return `KS-${timestamp}-${randomSuffix}`;
};

/**
 * @route POST /api/orders
 * @desc Create a new order or purchase request
 */
const createOrder = async (req, res) => {
  try {
    const buyerId = req.user?.id || req.user?._id || '65e000000000000000000002';
    const buyerName = req.user?.name || 'Priya Sharma';
    const buyerEmail = req.user?.email || 'buyer@kalasetu.org';
    const buyerPhone = req.user?.phone || '+91 98111 22334';

    const {
      items = [],
      shippingAddress,
      paymentMethod = 'cod',
      notes = ''
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart items are required to place an order.' });
    }

    if (!shippingAddress || !shippingAddress.fullName || !shippingAddress.street || !shippingAddress.city) {
      return res.status(400).json({ success: false, message: 'Complete shipping address is required.' });
    }

    // Calculate total amount & fair artisan contribution (approx 85% goes directly to artisan)
    const totalAmount = items.reduce((acc, item) => acc + (Number(item.price) * Number(item.quantity || 1)), 0);
    const directArtisanShare = Math.round(totalAmount * 0.85);

    const orderPayload = {
      orderNumber: generateOrderNumber(),
      buyerId,
      buyerName,
      buyerEmail,
      buyerPhone,
      items: items.map(item => ({
        productId: item.productId || item.id || item._id,
        name: item.name,
        price: Number(item.price),
        quantity: Number(item.quantity || 1),
        imageUrl: item.imageUrl || '',
        category: item.category || 'Handicrafts',
        artisanId: item.artisanId || item.userId || '65e000000000000000000001',
        artisanName: item.artisanName || 'Master Artisan'
      })),
      totalAmount,
      directArtisanShare,
      shippingAddress,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'completed',
      orderStatus: 'placed',
      notes,
      createdAt: new Date().toISOString()
    };

    if (isConnectedToMongo()) {
      const order = await Order.create(orderPayload);
      return res.status(201).json({
        success: true,
        message: 'Order placed successfully! The artisan has been notified.',
        data: order
      });
    } else {
      const newOrder = {
        _id: 'ord_' + Date.now(),
        id: 'ord_' + Date.now(),
        ...orderPayload
      };
      memoryStore.orders.unshift(newOrder);

      // Clear user cart in memory
      memoryStore.carts[buyerId] = [];

      return res.status(201).json({
        success: true,
        message: 'Order placed successfully! The artisan has been notified.',
        data: newOrder
      });
    }
  } catch (error) {
    console.error('Create Order Error:', error);
    res.status(500).json({ success: false, message: 'Failed to place order', error: error.message });
  }
};

/**
 * @route GET /api/orders/buyer
 * @desc Get all orders placed by the logged-in buyer
 */
const getBuyerOrders = async (req, res) => {
  try {
    const buyerId = req.user?.id || req.user?._id;

    if (isConnectedToMongo()) {
      const orders = await Order.find({ buyerId }).sort({ createdAt: -1 });
      return res.json({ success: true, count: orders.length, data: orders });
    } else {
      let orders = memoryStore.orders.filter(o => o.buyerId === buyerId);
      // Fallback: if empty, show all orders for demo buyer
      if (orders.length === 0) {
        orders = memoryStore.orders;
      }
      return res.json({ success: true, count: orders.length, data: orders });
    }
  } catch (error) {
    console.error('Get Buyer Orders Error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch orders' });
  }
};

/**
 * @route GET /api/orders/artisan
 * @desc Get incoming orders for products made by the logged-in artisan
 */
const getArtisanOrders = async (req, res) => {
  try {
    const artisanId = req.user?.id || req.user?._id || '65e000000000000000000001';
    const artisanName = req.user?.name || 'Radha Devi';

    if (isConnectedToMongo()) {
      const orders = await Order.find({
        $or: [
          { 'items.artisanId': artisanId },
          { 'items.artisanName': { $regex: artisanName, $options: 'i' } }
        ]
      }).sort({ createdAt: -1 });

      return res.json({ success: true, count: orders.length, data: orders });
    } else {
      const orders = memoryStore.orders.filter(o =>
        o.items.some(it => it.artisanId === artisanId || it.artisanName?.toLowerCase().includes(artisanName.toLowerCase()))
      );

      // If in-memory empty, return all mock orders for demo
      const resultOrders = orders.length > 0 ? orders : memoryStore.orders;
      return res.json({ success: true, count: resultOrders.length, data: resultOrders });
    }
  } catch (error) {
    console.error('Get Artisan Orders Error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch incoming artisan orders' });
  }
};

/**
 * @route PATCH /api/orders/:id/status
 * @desc Update order status (placed -> in_crafting -> dispatched -> delivered)
 */
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;

    const allowedStatuses = ['placed', 'confirmed', 'in_crafting', 'dispatched', 'delivered', 'cancelled'];
    if (!allowedStatuses.includes(orderStatus)) {
      return res.status(400).json({ success: false, message: 'Invalid order status value.' });
    }

    if (isConnectedToMongo()) {
      let order = null;
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
        order = await Order.findByIdAndUpdate(id, { orderStatus }, { new: true });
      }
      if (!order) {
        order = await Order.findOneAndUpdate({ orderNumber: id }, { orderStatus }, { new: true });
      }

      if (!order) {
        return res.status(404).json({ success: false, message: 'Order not found.' });
      }

      return res.json({
        success: true,
        message: `Order status updated to "${orderStatus}".`,
        data: order
      });
    } else {
      const index = memoryStore.orders.findIndex(o => o.id === id || o._id === id || o.orderNumber === id);
      if (index === -1) {
        return res.status(404).json({ success: false, message: 'Order not found.' });
      }

      memoryStore.orders[index].orderStatus = orderStatus;
      memoryStore.orders[index].updatedAt = new Date().toISOString();

      return res.json({
        success: true,
        message: `Order status updated to "${orderStatus}".`,
        data: memoryStore.orders[index]
      });
    }
  } catch (error) {
    console.error('Update Order Status Error:', error);
    res.status(500).json({ success: false, message: 'Failed to update order status' });
  }
};

module.exports = {
  createOrder,
  getBuyerOrders,
  getArtisanOrders,
  updateOrderStatus
};
