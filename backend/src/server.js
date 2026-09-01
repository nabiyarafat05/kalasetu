const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const { connectDB, memoryStore, isConnectedToMongo } = require('./config/db');
const Product = require('./models/Product');
const { seedInitialData } = require('./seeds/seedData');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Static uploads folder for enhanced and uploaded craft images
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cartRoutes = require('./routes/cartRoutes');
const favouriteRoutes = require('./routes/favouriteRoutes');
const artisanRoutes = require('./routes/artisanRoutes');
const aiRoutes = require('./routes/aiRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/favourites', favouriteRoutes);
app.use('/api/artisans', artisanRoutes);
app.use('/api/ai', aiRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    platform: 'KalaSetu - Two-Sided Artisan Marketplace & AI Hub',
    version: '2.0.0',
    mode: isConnectedToMongo() ? 'MongoDB Connected' : 'Resilient In-Memory Mode',
    timestamp: new Date().toISOString()
  });
});

// Friendly Welcome Page
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head><title>KalaSetu API | Two-Sided Artisan Marketplace</title></head>
      <body style="font-family: sans-serif; text-align: center; padding: 50px; background: #FAF6F0; color: #1E2A38;">
        <h1 style="color: #C85A32; font-size: 2.5rem;">🪔 KalaSetu (कला सेतु) Marketplace API</h1>
        <p style="font-size: 1.2rem;">AI-Powered Digital Platform & Two-Sided Marketplace for Indian Artisans & Global Buyers</p>
        <p><strong>Database Mode:</strong> ${isConnectedToMongo() ? 'MongoDB Atlas / Local' : 'Resilient In-Memory Storage'}</p>
        <div style="margin-top: 30px; display: flex; justify-content: center; gap: 15px; flex-wrap: wrap;">
          <a href="/api/health" style="background: #C85A32; color: white; padding: 10px 20px; text-decoration: none; border-radius: 8px; font-weight: bold;">Health Check</a>
          <a href="/api/products" style="background: #2D6A4F; color: white; padding: 10px 20px; text-decoration: none; border-radius: 8px; font-weight: bold;">Products API</a>
          <a href="/api/artisans" style="background: #E89843; color: white; padding: 10px 20px; text-decoration: none; border-radius: 8px; font-weight: bold;">Artisans API</a>
          <a href="/api/orders/buyer" style="background: #1E2A38; color: white; padding: 10px 20px; text-decoration: none; border-radius: 8px; font-weight: bold;">Orders API</a>
        </div>
      </body>
    </html>
  `);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Start Server
const startServer = async () => {
  await connectDB();
  await seedInitialData(Product, memoryStore, isConnectedToMongo());

  app.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(`🌟 KalaSetu 2.0 Backend Server running on port ${PORT}`);
    console.log(`📡 Base API URL:       http://localhost:${PORT}/api`);
    console.log(`🛍️ Products API:       http://localhost:${PORT}/api/products`);
    console.log(`🎨 Artisans API:       http://localhost:${PORT}/api/artisans`);
    console.log(`🛒 Cart & Orders API:  http://localhost:${PORT}/api/orders`);
    console.log(`🧠 AI Features:        http://localhost:${PORT}/api/ai/catalog`);
    console.log(`======================================================\n`);
  });
};

startServer();
