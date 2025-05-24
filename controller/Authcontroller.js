const User = require('../models/Usermodel.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body; 
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    res.status(201).json({ message: 'User created' });
  } catch (err) {
    console.error(err); 
    res.status(500).json({ message: 'Server error' });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      token,
      user: { id: user._id, email: user.email, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
