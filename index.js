const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const serverless = require('serverless-http');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/Authroute'));
app.use('/api/reports', require('./routes/Reportroutes'));
app.use('/api/recruitment', require('./routes/RecrutmentRoute'));

app.get('/', (req, res) => {
  res.send('HR Reporting & Placement Management API Running');
});

// Export handler for serverless deployment
module.exports.handler = serverless(app);
