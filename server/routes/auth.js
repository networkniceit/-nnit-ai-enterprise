const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { demoUsers } = require('../middleware/auth');

// Generate JWT Token
const generateToken = (id, email, name) => {
  return jwt.sign({ id, email, name }, process.env.JWT_SECRET || 'demo-secret-key', {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    // Demo mode - store in memory
    const userId = Date.now().toString();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = {
      id: userId,
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: role || 'both',
      avatar: 'https://via.placeholder.com/150',
      skills: [],
      rating: 0,
      completedProjects: 0,
      earnings: 0,
      createdAt: new Date()
    };

    demoUsers.set(userId, user);

    const token = generateToken(user.id, user.email, user.name);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide email and password' });
    }

    // Demo mode - check in-memory users
    let user = null;
    for (const [id, u] of demoUsers.entries()) {
      if (u.email === email.toLowerCase()) {
        user = u;
        break;
      }
    }

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user.id, user.email, user.name);

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', require('../middleware/auth').protect, async (req, res) => {
  res.json({
    success: true,
    user: req.user
  });
});

module.exports = router;
