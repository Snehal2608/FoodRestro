// backend/models/Testimonial.js
import mongoose from 'mongoose'; // Use import for consistency

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  text: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String, // URL to the reviewer's image
    default: 'https://placehold.co/100x100/cccccc/000000?text=User' // Default placeholder image
  },
  createdAt: {
    type: Date,
    default: Date.now // Automatically set the creation timestamp
  }
});

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

export default Testimonial; // Use export default for consistency
