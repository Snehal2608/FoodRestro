// backend/server.js (or app.js) - Example integration
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// These imports are typically used within auth.js, but are harmless here.
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from './models/User.js'; // Corrected path to User model

// Import your authentication routes
import authRoutes from './routes/auth.js'; 
// Import your testimonial routes
import testimonialRoutes from './routes/testimonial.js'; 
// Import your menu routes
import menuRoutes from './routes/menu.js'; 
// Import your order routes
import orderRoutes from './routes/order.js'; 
// Import the protect middleware from authMiddleware.js
import { protect } from './middleware/authMiddleware.js'; 

dotenv.config(); // Load environment variables from .env file

// Initialize Express app
const app = express(); 

const PORT = process.env.PORT || 5000;

// -------------------- Middleware --------------------
// Enable CORS for all origins.
app.use(cors());

// Middleware to parse JSON bodies from incoming requests.
app.use(express.json());

// --- General Test Routes (can be removed later once auth works) ---
app.get('/', (req, res) => {
    res.send('Hello from the backend root!');
});
app.get('/api', (req, res) => {
    res.send('Hello from /api!');
});
// ---------------------------------------------------


// -------------------- Routes --------------------
// All routes defined in auth.js will be prefixed with '/api/auth'
app.use('/api/auth', authRoutes);
// All routes defined in testimonials.js will be prefixed with '/api/testimonials'
app.use('/api/testimonials', testimonialRoutes); 
// All routes defined in menu.js will be prefixed with '/api/menu'
app.use('/api/menu', menuRoutes); 
// All routes defined in orders.js will be prefixed with '/api/orders'
// The 'protect' middleware is now applied directly within orders.js routes for specific endpoints.
app.use('/api/orders', orderRoutes); 


// Example of a protected route that requires authentication (optional, for testing)
app.get('/api/protected', protect, (req, res) => {
  res.json({ msg: `Welcome, user ${req.user.id}! You accessed a protected route.` });
});


// -------------------- Database Connection --------------------
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI); // Uses MONGO_URI from .env
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
