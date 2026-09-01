const mongoose = require('mongoose');

// In-memory data store fallback for quick demo & zero-config hackathon execution
const memoryStore = {
  users: [],
  products: [],
  catalogs: [],
  priceSuggestions: [],
  orders: [],
  carts: {}, // userId -> [items]
  favourites: {} // userId -> [productId]
};

let isConnectedToMongo = false;

const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/kalasetu';
  
  try {
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 2500, // Quick failover to mock store if no Mongo is running
    });
    isConnectedToMongo = true;
    console.log(`✨ MongoDB Connected successfully: ${conn.connection.host}`);
  } catch (error) {
    isConnectedToMongo = false;
    console.warn(`⚠️ Local MongoDB not detected (${error.message}).`);
    console.log(`🚀 KalaSetu is running in Resilient In-Memory Mode with two-sided marketplace support.`);
    console.log(`ℹ️ To use MongoDB, start a local MongoDB daemon or set MONGODB_URI in .env`);
  }
};

module.exports = {
  connectDB,
  isConnectedToMongo: () => isConnectedToMongo,
  memoryStore
};
