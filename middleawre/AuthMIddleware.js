const jwt = require('jsonwebtoken');
const User = require('../models/Usermodel');

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer '))
    return res.status(401).json({ message: 'Unauthorized' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(401).json({ message: 'User not found' });

    req.user = user;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

const authorize = (...roles) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized: No user info found' });
  }
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Forbidden: Insufficient role' });
  }
  next();
};

module.exports = { authenticate, authorize };
