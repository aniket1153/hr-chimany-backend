const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.sendStatus(200);
});

app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/Authroute'));
app.use('/api/reports', require('./routes/Reportroutes'));
app.use('/api/recruitment', require('./routes/RecrutmentRoute'));

app.get('/', (req, res) => {
  res.send('HR Reporting & Placement Management API Running');
});

// ✅ Export the app as a serverless function
module.exports = app;
