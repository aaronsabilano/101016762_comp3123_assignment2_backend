// config/db.js
// This file connects our app to MongoDB using Mongoose

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Read connection string from .env
    const uri = process.env.MONGO_URI;

    if (!uri) {
      console.error('MONGO_URI is not defined in .env');
      process.exit(1);
    }

    // Connect to MongoDB
    await mongoose.connect(uri);

    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1); // stop the app if DB fails
  }
};

module.exports = connectDB;
