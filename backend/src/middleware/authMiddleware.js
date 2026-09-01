const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { isConnectedToMongo, memoryStore } = require('../config/db');
const { DEMO_USER } = require('../controllers/authController');

const JWT_SECRET = process.env.JWT_SECRET || 'kalasetu_artisan_secret_key_2026';

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Allow test / demo requests if no token passed or demo token provided
  if (!token || token === 'demo_token' || token === 'null' || token === 'undefined') {
    req.user = DEMO_USER;
    return next();
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (isConnectedToMongo()) {
      const user = await User.findById(decoded.id).select('-password');
      req.user = user || DEMO_USER;
    } else {
      const user = memoryStore.users.find(u => (u.id === decoded.id || u._id === decoded.id));
      req.user = user || DEMO_USER;
    }

    next();
  } catch (error) {
    // If token expired or invalid, fallback to demo user for smooth prototype demo experience
    req.user = DEMO_USER;
    next();
  }
};

module.exports = { protect };
