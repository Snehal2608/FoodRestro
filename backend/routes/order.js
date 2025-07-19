// backend/routes/orders.js
import express from 'express';
import Order from '../models/Order.js'; // Adjust path
import MenuItem from '../models/MenuItem.js'; // To validate item prices from DB
import { protect } from '../middleware/authMiddleware.js'; // Import the protect middleware

const router = express.Router();

// @route   POST /api/orders
// @desc    Place a new order
// @access  Private (requires authentication to associate with userId)
router.post('/', protect, async (req, res) => { // Applied protect middleware here
  const { customerName, customerAddress, customerPhone, items, paymentMethod } = req.body;

  // Basic validation for required fields
  if (!customerName || !customerAddress || !customerPhone || !items || items.length === 0 || !paymentMethod) {
    return res.status(400).json({ msg: 'Please provide all required order details: name, address, phone, items, and payment method.' });
  }

  try {
    let calculatedTotal = 0;
    const orderItemsWithDetails = [];

    // Validate each item and calculate total on the server-side to prevent tampering
    for (const itemData of items) {
      if (!itemData.menuItemId || !itemData.quantity || itemData.quantity <= 0) {
        return res.status(400).json({ msg: 'Invalid item data in order.' });
      }
      const menuItem = await MenuItem.findById(itemData.menuItemId);
      if (!menuItem || !menuItem.isAvailable) {
        return res.status(404).json({ msg: `Menu item with ID ${itemData.menuItemId} not found or not available.` });
      }
      calculatedTotal += menuItem.price * itemData.quantity;
      orderItemsWithDetails.push({
        menuItemId: menuItem._id,
        name: menuItem.name,
        price: menuItem.price,
        quantity: itemData.quantity,
      });
    }

    const newOrder = new Order({
      userId: req.user.id, // Now correctly gets userId from the authenticated request (attached by protect middleware)
      customerName,
      customerAddress,
      customerPhone,
      items: orderItemsWithDetails,
      totalAmount: calculatedTotal, // Use backend calculated total for accuracy
      paymentMethod,
      orderStatus: 'Pending', // Initial status
    });

    const order = await newOrder.save();
    res.status(201).json({ msg: 'Order placed successfully!', order });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/orders
// @desc    Get orders for the authenticated user
// @access  Private (requires authentication)
router.get('/', protect, async (req, res) => { // Applied protect middleware here
  try {
    // Find orders where userId matches the authenticated user's ID
    const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default router;
