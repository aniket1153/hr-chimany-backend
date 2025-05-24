const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/Usermodel');
const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) return res.status(401).json({ msg: 'Invalid credentials' });

  const token = jwt.sign({ userId: user._id, role: user.role }, 'secretkey', {
    expiresIn: '1d',
  });

  res.json({ token, role: user.role });
});

module.exports = router;
