// backend/routes/menu.js
import express from 'express';
import MenuItem from '../models/MenuItem.js'; // Adjust path if necessary

const router = express.Router();

// @route   GET /api/menu
// @desc    Get all available menu items
// @access  Public
router.get('/', async (req, res) => {
  try {
    // Fetch only available items, sorted by category and then name
    const menuItems = await MenuItem.find({ isAvailable: true }).sort({ category: 1, name: 1 });
    res.json(menuItems);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/menu
// @desc    Add a new menu item (typically for admin use)
// @access  Private (e.g., requires authentication/admin role)
router.post('/', async (req, res) => {
  const { name, description, price, category, image, isAvailable } = req.body;

  // Basic validation
  if (!name || !price || !category) {
    return res.status(400).json({ msg: 'Name, price, and category are required for a menu item.' });
  }
  if (typeof price !== 'number' || price < 0) {
    return res.status(400).json({ msg: 'Price must be a non-negative number.' });
  }

  try {
    const newMenuItem = new MenuItem({
      name,
      description,
      price,
      category,
      image,
      isAvailable: isAvailable !== undefined ? isAvailable : true, // Default to true if not provided
    });

    const item = await newMenuItem.save();
    res.status(201).json(item); // 201 Created
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default router;
