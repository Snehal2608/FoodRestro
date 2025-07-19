        // backend/models/MenuItem.js
        import mongoose from 'mongoose';

        const menuItemSchema = new mongoose.Schema({
          name: { type: String, required: true, trim: true },
          description: { type: String, trim: true },
          price: { type: Number, required: true, min: 0 },
          category: { type: String, trim: true }, // e.g., 'Pizzas', 'Pastas', 'Burgers', 'Drinks'
          image: { type: String, default: 'https://placehold.co/300x200?text=FoodItem' }, // URL to item image
          isAvailable: { type: Boolean, default: true }, // Whether the item is currently available
          createdAt: { type: Date, default: Date.now },
        });

        const MenuItem = mongoose.model('MenuItem', menuItemSchema);

        export default MenuItem;
        