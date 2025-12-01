// server.js
// Main entry point for the backend API

// Load environment variables from .env
require('dotenv').config();

// Function to connect to MongoDB
const connectDB = require('./config/db');

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

// Route modules
const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();

// -------------------- MIDDLEWARE --------------------

// Allow frontend to call this backend from a different origin (port 3000 later)
app.use(cors());

// Parse incoming JSON bodies
app.use(express.json());

// Log requests to console (method, url, status, time)
app.use(morgan('dev'));

// Serve static files from /uploads so profile pictures can be accessed by URL
// e.g. http://localhost:5000/uploads/1234-image.png
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// -------------------- ROUTES --------------------

// Auth routes: /api/auth/signup, /api/auth/login
app.use('/api/auth', authRoutes);

// Employee routes: /api/employees/...
app.use('/api/employees', employeeRoutes);

// Simple health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend is running 🚀' });
});

// -------------------- START SERVER --------------------

const PORT = process.env.PORT || 5000;

// First connect to MongoDB, then start listening
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
