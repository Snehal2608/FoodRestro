// backend/routes/testimonials.js
import express from 'express'; // Use import here too
import Testimonial from '../models/Testimonial.js'; // Adjust path and add .js extension

const router = express.Router();

// @route   GET /api/testimonials
// @desc    Get all testimonials, sorted by creation date (latest first)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/testimonials
// @desc    Add a new testimonial
// @access  Public (or Protected if you want only logged-in users to review)
router.post('/', async (req, res) => {
  const { name, rating, text, image } = req.body;

  // Basic validation
  if (!name || !rating || !text) {
    return res.status(400).json({ msg: 'Please enter all required fields: name, rating, and text' });
  }
  if (rating < 1 || rating > 5) {
    return res.status(400).json({ msg: 'Rating must be between 1 and 5' });
  }

  try {
    const newTestimonial = new Testimonial({
      name,
      rating,
      text,
      image
    });

    const testimonial = await newTestimonial.save();
    res.status(201).json(testimonial);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default router; // Changed from module.exports = router;