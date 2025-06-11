/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// These imports are typically used within auth.js, but are harmless here.
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from './models/User.js'; 

// Import your authentication routes
import authRoutes from './routes/auth.js'; 

dotenv.config(); // Load environment variables from .env file

// CRITICAL FIX: Initialize Express app correctly!
const app = express(); 

const PORT = process.env.PORT || 5000;

// -------------------- Middleware --------------------
// CRITICAL FIX: These middleware MUST come before any routes or routers!
// Enable CORS for all origins.
app.use(cors());

// Middleware to parse JSON bodies from incoming requests.
// This must be placed before any routes that expect JSON in req.body.
app.use(express.json());

// --- General Test Routes (can be removed later once auth works) ---
// These routes help confirm your server is generally running and Express is handling GET requests.
app.get('/', (req, res) => {
    res.send('Hello from the backend root!');
});
app.get('/api', (req, res) => {
    res.send('Hello from /api!');
});
// ---------------------------------------------------


// -------------------- Routes --------------------
// CRITICAL FIX: Mount your authRoutes AFTER global middleware and general routes!
// All routes defined in auth.js will be prefixed with '/api/auth'
// So, auth.js's '/signup' becomes '/api/auth/signup', and '/login' becomes '/api/auth/login'
app.use('/api/auth', authRoutes);

// IMPORTANT: Ensure you DO NOT have duplicate /api/register or /api/login routes defined directly here.
// They should be in auth.js if you're using the modular approach.
/*
// @route   POST /api/register
// @desc    Register a new user
// @access  Public
app.post('/api/register', async (req, res) => {
    // This block should be in auth.js
});

// @route   POST /api/login
// @desc    Authenticate user & get token
// @access  Public
app.post('/api/login', async (req, res) => {
    // This block should be in auth.js
});
*/


// -------------------- Database Connection --------------------
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        console.error('Full MongoDB connection error object:', err);
        process.exit(1); // Exit process with failure if database connection fails
    }
};

// -------------------- Start Server --------------------
// Call connectDB function to establish database connection,
// then start the Express server only after a successful connection.
connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});