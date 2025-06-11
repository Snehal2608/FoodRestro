import express from 'express';
import bcrypt from 'bcrypt'; // Using 'bcrypt' as you had it in your latest auth.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Ensure the path to your User model is correct

const router = express.Router();
console.log('Auth.js router file loaded and now processing requests for authentication.');

// Signup Route: POST /api/auth/signup
router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Basic validation
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(409).json({ message: 'User with this username or email already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create new user
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'Signup successful!' });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Signup failed', error: error.message });
    }
});

// Login Route: POST /api/auth/login
router.post('/login', async (req, res) => {
    console.log('--- Backend /api/auth/login route handler STARTED ---');
    try {
        const { identifier, password } = req.body; // 'identifier' can be username or email
        console.log("Login request:", { identifier, password: '***' }); // Mask password for logging

        // Find user by username or email
        const user = await User.findOne({ $or: [{ username: identifier }, { email: identifier }] });
        if (!user) {
            console.log("User not found for identifier:", identifier);
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Validate password
        // Assuming your User model has a method 'matchPassword', or use bcrypt.compare directly
        const isPasswordValid = await bcrypt.compare(password, user.password); 

        if (!isPasswordValid) {
            console.log("Password incorrect for user:", identifier);
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.JWT_SECRET, // Make sure JWT_SECRET is in your .env file
            { expiresIn: '5h' } // Token expires in 5 hours
        );
        console.log("Login successful. Token generated.");

        res.status(200).json({ token, message: 'Logged in successfully' });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
});

export default router;