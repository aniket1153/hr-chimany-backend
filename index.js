const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Create Express app
const app = express();

// Middleware
app.use(cors()); // Default: allows all origins
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/Authroute'));
app.use('/api/reports', require('./routes/Reportroutes'));
app.use('/api/recruitment', require('./routes/RecrutmentRoute'));

// Root route
app.get('/', (req, res) => {
  res.send('HR Reporting & Placement Management API Running');
});

// Export the app for Vercel
module.exports = app;
