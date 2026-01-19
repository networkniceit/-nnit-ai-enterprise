const express = require('express');
const router = express.Router();
const { protect, demoUsers } = require('../middleware/auth');

// @route   GET /api/users/:id
// @desc    Get user profile
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const user = demoUsers.get(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Don't send password
    const { password, ...userWithoutPassword } = user;

    res.json({
      success: true,
      user: userWithoutPassword
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route   PUT /api/users/:id
// @desc    Update user profile
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    if (req.params.id !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to update this profile' });
    }

    const user = demoUsers.get(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update allowed fields
    const { name, bio, skills, avatar } = req.body;

    if (name) user.name = name;
    if (bio) user.bio = bio;
    if (skills) user.skills = skills;
    if (avatar) user.avatar = avatar;

    demoUsers.set(req.params.id, user);

    const { password, ...userWithoutPassword } = user;

    res.json({
      success: true,
      user: userWithoutPassword
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route   GET /api/users
// @desc    Get all users (freelancers)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const users = Array.from(demoUsers.values()).map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });

    res.json({
      success: true,
      count: users.length,
      users
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
