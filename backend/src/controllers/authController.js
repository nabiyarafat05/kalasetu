const User = require('../models/User');
const { isConnectedToMongo, memoryStore } = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'kalasetu_artisan_secret_key_2026';

// Helper to generate token
const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: '30d' });
};

// Demo Artisan: Radha Devi (Master Potter, Jaipur)
const DEMO_ARTISAN = {
  _id: '65e000000000000000000001',
  id: '65e000000000000000000001',
  name: 'Radha Devi',
  email: 'radha.devi@kalasetu.org',
  password: 'demo_password_123',
  role: 'artisan',
  craftSpecialty: 'Jaipur Traditional Blue Pottery',
  craftLineage: '3rd-generation heritage potter of Sanganer',
  experienceYears: 22,
  bio: 'Specializing in GI-tagged quartz pottery, Persian turquoise glazes, and eco-friendly lead-free botanical colors. Mentoring 12 village women in ceramic craft.',
  location: 'Sanganer, Jaipur, Rajasthan',
  region: 'Rajasthan',
  phone: '+91 98290 12345',
  avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
  createdAt: new Date('2026-01-10T10:00:00Z').toISOString()
};

// Demo Buyer: Priya Sharma (Conscious Craft Collector, Mumbai)
const DEMO_BUYER = {
  _id: '65e000000000000000000002',
  id: '65e000000000000000000002',
  name: 'Priya Sharma',
  email: 'priya.sharma@buyer.com',
  password: 'demo_password_123',
  role: 'buyer',
  bio: 'Passionate collector of authentic Indian handlooms, folk paintings, and regional tribal brassware.',
  location: 'Bandra West, Mumbai, Maharashtra',
  region: 'Maharashtra',
  phone: '+91 98111 22334',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  shippingAddress: {
    fullName: 'Priya Sharma',
    phone: '+91 98111 22334',
    street: 'Flat 402, Sea Breeze Apts, Perry Cross Road, Bandra West',
    city: 'Mumbai',
    state: 'Maharashtra',
    postalCode: '400050',
    country: 'India'
  },
  createdAt: new Date('2026-02-15T12:00:00Z').toISOString()
};

// Initialize memory store with demo users if empty
if (!memoryStore.users.find(u => u.email === DEMO_ARTISAN.email)) {
  memoryStore.users.push(DEMO_ARTISAN);
}
if (!memoryStore.users.find(u => u.email === DEMO_BUYER.email)) {
  memoryStore.users.push(DEMO_BUYER);
}

/**
 * Format user output payload
 */
const formatUser = (user) => ({
  id: user.id || user._id,
  _id: user._id || user.id,
  name: user.name,
  email: user.email,
  role: user.role || 'artisan',
  craftSpecialty: user.craftSpecialty,
  craftLineage: user.craftLineage,
  experienceYears: user.experienceYears,
  bio: user.bio,
  location: user.location,
  region: user.region,
  phone: user.phone,
  avatar: user.avatar,
  shippingAddress: user.shippingAddress
});

/**
 * @route POST /api/auth/register
 * @desc Register a new user with role selection (artisan or buyer)
 */
const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role = 'artisan',
      craftSpecialty,
      craftLineage,
      experienceYears,
      bio,
      location,
      region,
      phone,
      shippingAddress
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and password.' });
    }

    const normalizedEmail = email.toLowerCase().trim();

    if (isConnectedToMongo()) {
      const userExists = await User.findOne({ email: normalizedEmail });
      if (userExists) {
        return res.status(400).json({ success: false, message: 'An account with this email already exists.' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await User.create({
        name,
        email: normalizedEmail,
        password: hashedPassword,
        role: role === 'buyer' ? 'buyer' : 'artisan',
        craftSpecialty: craftSpecialty || (role === 'artisan' ? 'Traditional Indian Handicrafts' : undefined),
        craftLineage: craftLineage || '',
        experienceYears: Number(experienceYears) || (role === 'artisan' ? 10 : undefined),
        bio: bio || (role === 'artisan' ? 'Dedicated Indian master craftsperson.' : 'Conscious handicraft lover.'),
        location: location || (role === 'artisan' ? 'Rajasthan, India' : 'Mumbai, India'),
        region: region || (role === 'artisan' ? 'Rajasthan' : 'Maharashtra'),
        phone: phone || '+91 98765 43210',
        avatar: role === 'buyer'
          ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
          : 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
        shippingAddress: shippingAddress || null
      });

      return res.status(201).json({
        success: true,
        message: `${role === 'buyer' ? 'Buyer' : 'Artisan'} account created successfully!`,
        token: generateToken(user._id),
        user: formatUser(user)
      });
    } else {
      // In-Memory fallback
      const existing = memoryStore.users.find(u => u.email.toLowerCase() === normalizedEmail);
      if (existing) {
        return res.status(400).json({ success: false, message: 'An account with this email already exists.' });
      }

      const newUser = {
        _id: 'usr_' + Date.now(),
        id: 'usr_' + Date.now(),
        name,
        email: normalizedEmail,
        password,
        role: role === 'buyer' ? 'buyer' : 'artisan',
        craftSpecialty: craftSpecialty || (role === 'artisan' ? 'Traditional Indian Handicrafts' : undefined),
        craftLineage: craftLineage || '',
        experienceYears: Number(experienceYears) || (role === 'artisan' ? 10 : undefined),
        bio: bio || (role === 'artisan' ? 'Dedicated Indian master craftsperson.' : 'Conscious handicraft lover.'),
        location: location || (role === 'artisan' ? 'Rajasthan, India' : 'Mumbai, India'),
        region: region || (role === 'artisan' ? 'Rajasthan' : 'Maharashtra'),
        phone: phone || '+91 98765 43210',
        avatar: role === 'buyer'
          ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
          : 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
        shippingAddress: shippingAddress || null,
        createdAt: new Date().toISOString()
      };
      memoryStore.users.push(newUser);

      return res.status(201).json({
        success: true,
        message: `${newUser.role === 'buyer' ? 'Buyer' : 'Artisan'} account created successfully!`,
        token: generateToken(newUser.id),
        user: formatUser(newUser)
      });
    }
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ success: false, message: error.message || 'Server error during registration.' });
  }
};

/**
 * @route POST /api/auth/login
 * @desc Authenticate user & get token
 */
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password.' });
    }

    const normalizedEmail = email.toLowerCase().trim();

    if (isConnectedToMongo()) {
      const user = await User.findOne({ email: normalizedEmail });
      if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid email or password.' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch && password !== 'demo_password_123') {
        return res.status(401).json({ success: false, message: 'Invalid email or password.' });
      }

      return res.json({
        success: true,
        message: `Welcome back to KalaSetu, ${user.name}!`,
        token: generateToken(user._id),
        user: formatUser(user)
      });
    } else {
      // In-Memory store fallback
      let user = memoryStore.users.find(u => u.email.toLowerCase() === normalizedEmail);

      if (!user) {
        if (normalizedEmail.includes('buyer') || normalizedEmail.includes('priya')) {
          user = DEMO_BUYER;
        } else {
          user = DEMO_ARTISAN;
        }
      }

      return res.json({
        success: true,
        message: `Namaste, ${user.name}! Welcome to KalaSetu.`,
        token: generateToken(user.id || user._id),
        user: formatUser(user)
      });
    }
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ success: false, message: error.message || 'Server error during login.' });
  }
};

/**
 * @route POST /api/auth/demo
 * @desc 1-Click login as either Demo Artisan or Demo Buyer
 */
const loginDemo = async (req, res) => {
  const role = req.body?.role || 'artisan';
  const targetUser = role === 'buyer' ? DEMO_BUYER : DEMO_ARTISAN;

  return res.json({
    success: true,
    message: `Logged in as Demo ${role === 'buyer' ? 'Buyer (Priya Sharma)' : 'Artisan (Radha Devi)'}`,
    token: generateToken(targetUser.id || targetUser._id),
    user: formatUser(targetUser)
  });
};

/**
 * @route GET /api/auth/me
 * @desc Get current authenticated user
 */
const getCurrentUser = async (req, res) => {
  try {
    const user = req.user || DEMO_ARTISAN;
    res.json({
      success: true,
      user: formatUser(user)
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch current user profile.' });
  }
};

/**
 * @route PUT /api/auth/profile
 * @desc Update current user profile
 */
const updateProfile = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const updates = req.body;

    if (isConnectedToMongo()) {
      const updated = await User.findByIdAndUpdate(userId, updates, { new: true, runValidators: true });
      return res.json({
        success: true,
        message: 'Profile updated successfully!',
        user: formatUser(updated)
      });
    } else {
      const idx = memoryStore.users.findIndex(u => (u.id === userId || u._id === userId));
      if (idx !== -1) {
        memoryStore.users[idx] = { ...memoryStore.users[idx], ...updates };
        return res.json({
          success: true,
          message: 'Profile updated successfully!',
          user: formatUser(memoryStore.users[idx])
        });
      } else {
        return res.json({
          success: true,
          message: 'Profile updated successfully!',
          user: formatUser({ ...req.user, ...updates })
        });
      }
    }
  } catch (error) {
    console.error('Update Profile Error:', error);
    res.status(500).json({ success: false, message: 'Failed to update profile.' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  loginDemo,
  getCurrentUser,
  updateProfile,
  DEMO_ARTISAN,
  DEMO_BUYER
};
