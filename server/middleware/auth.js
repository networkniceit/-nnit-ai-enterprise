const jwt = require('jsonwebtoken');

// In-memory store for demo mode
const demoUsers = new Map();

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'demo-secret-key');
      
      // Check demo users first
      if (demoUsers.has(decoded.id)) {
        req.user = demoUsers.get(decoded.id);
        return next();
      }

      // Try to get from database if connected
      try {
        const User = require('../models/User');
        req.user = await User.findById(decoded.id).select('-password');
      } catch (err) {
        // Database not available, use demo mode
        req.user = { id: decoded.id, email: decoded.email, name: decoded.name };
      }

      next();
    } catch (error) {
      res.status(401).json({ error: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ error: 'Not authorized, no token' });
  }
};

module.exports = { protect, demoUsers };
