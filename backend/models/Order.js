// backend/models/Order.js
import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
});

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // UNCOMMENTED and set to required
  customerName: { type: String, required: true, trim: true },
  customerAddress: { type: String, required: true, trim: true },
  customerPhone: { type: String, required: true, trim: true },
  items: [orderItemSchema], // Array of sub-documents for items in the order
  totalAmount: { type: Number, required: true, min: 0 },
  paymentMethod: { type: String, required: true, enum: ['Cash on Delivery', 'Online Payment'] },
  orderStatus: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'],
    default: 'Pending',
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Middleware to update `updatedAt` field on every save
orderSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
