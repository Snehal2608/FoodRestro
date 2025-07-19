// backend/routes/auth.js
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Adjust path if necessary

const router = express.Router();

// Get JWT secret from environment variables, with a fallback.
// This ensures JWT_SECRET is ALWAYS defined, even if .env fails for some reason.
const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_jwt_key_fallback'; // Added fallback for consistency

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create new user instance
    user = new User({
      username,
      email,
      password, // Password will be hashed by pre-save hook in User model
    });

    // Hash password (if not already handled by a pre-save hook in User model)
    // Note: If you have a pre-save hook in your User model for hashing, this step can be removed.
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Create JWT payload
    const payload = {
      user: {
        id: user.id,
      },
    };

    // Sign the token
    jwt.sign(
      payload,
      JWT_SECRET, // Use the same JWT_SECRET for signing
      { expiresIn: '1h' }, // Token expires in 1 hour
      (err, token) => {
        if (err) throw err;
        res.json({ token, msg: 'User registered successfully' });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Create JWT payload
    const payload = {
      user: {
        id: user.id,
      },
    };

    // Sign the token
    jwt.sign(
      payload,
      JWT_SECRET, // Use the same JWT_SECRET for signing
      { expiresIn: '1h' }, // Token expires in 1 hour
      (err, token) => {
        if (err) throw err;
        res.json({ token, msg: 'Logged in successfully' });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default router;
