const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware'); // Adjust path

// @route   GET /api/data/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', protect, (req, res) => {
  // req.user is available here thanks to the 'protect' middleware
  res.json({
    message: 'Welcome to your profile!',
    user: req.user,
  });
});

// @route   GET /api/data/admin
// @desc    Admin only data
// @access  Private (Admin role required)
router.get('/admin', protect, authorize(['admin']), (req, res) => {
  res.json({
    message: 'Welcome to the Admin Panel!',
    user: req.user,
  });
});

// @route   GET /api/data/editor-or-admin
// @desc    Editor or Admin data
// @access  Private (Editor or Admin role required)
router.get('/editor-or-admin', protect, authorize(['editor', 'admin']), (req, res) => {
  res.json({
    message: 'Content for editors and admins!',
    user: req.user,
  });
});

module.exports = router;