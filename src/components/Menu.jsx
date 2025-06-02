import React from 'react';

const menuData = {
  italian: [
    { name: 'Margherita Pizza', description: 'Classic tomato sauce, fresh mozzarella, and basil.', price: '₹350' },
    { name: 'Pepperoni Pizza', description: 'Our Margherita topped with savory pepperoni slices.', price: '₹420' },
    { name: 'Veggie Supreme Pizza', description: 'Bell peppers, onions, mushrooms, olives, and sweet corn on a classic base.', price: '₹400' },
    { name: 'Spaghetti Aglio e Olio', description: 'Simple yet exquisite spaghetti tossed with garlic, olive oil, and chili flakes.', price: '₹380' },
    { name: 'Penne Arrabbiata', description: 'Penne pasta in a spicy tomato sauce with garlic and parsley.', price: '₹400' },
    { name: 'Creamy Mushroom Risotto', description: 'Arborio rice cooked to perfection with cremini mushrooms, Parmesan, and a touch of cream.', price: '₹450' },
    { name: 'Lasagna Al Forno (Veg / Non-Veg)', description: 'Layers of pasta, rich béchamel, and your choice of seasonal vegetables or spiced minced chicken.', price: '₹480 / ₹520' },
    { name: 'Garlic Bread with Cheese', description: 'Toasted bread topped with garlic butter and melted mozzarella.', price: '₹180' },
  ],
  junkFood: [
    { name: 'Classic Cheeseburger', description: 'Juicy patty (veg/chicken), melted cheese, lettuce, tomato, onions, and our secret sauce in a brioche bun. Served with fries.', price: '₹300 / ₹380' },
    { name: 'Spicy Paneer Zinger Burger', description: 'Crispy fried paneer patty, spicy mayo, and fresh veggies in a toasted bun. Served with fries.', price: '₹350' },
    { name: 'Crispy Chicken Burger', description: 'Golden fried chicken fillet, fresh lettuce, and tangy mayonnaise. Served with fries.', price: '₹370' },
    { name: 'Loaded Fries', description: 'Crispy fries topped with cheese sauce, jalapeños, and your choice of peri-peri seasoning or spicy chicken chunks.', price: '₹250 / ₹300' },
    { name: 'Chicken Nuggets (6 pcs)', description: 'Golden fried chicken nuggets, served with a choice of dip.', price: '₹280' },
    { name: 'Veg Spring Rolls (4 pcs)', description: 'Crispy rolls filled with seasoned vegetables, served with sweet chili sauce.', price: '₹220' },
    { name: 'Hot Dog (Chicken / Pork)', description: 'Classic hot dog with mustard, ketchup, and relish.', price: '₹250 / ₹300' },
    { name: 'Onion Rings', description: 'Perfectly golden and crispy onion rings, served with a zesty dip.', price: '₹200' },
  ],
  beverages: [
    { name: 'Soft Drinks (Coke, Sprite, Fanta)', price: '₹80' },
    { name: 'Fresh Lime Soda (Sweet/Salted)', price: '₹100' },
    { name: 'Iced Tea (Lemon/Peach)', price: '₹120' },
    { name: 'Oreo Milkshake', price: '₹180' },
    { name: 'Chocolate Milkshake', price: '₹180' },
  ],
};

const Menu = () => {
  return (
    <section id="menu" className="py-16 md:py-24 bg-gray-50 font-inter">
      <div className="container mx-auto px-4">
        {/* Main Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 tracking-tight">
            Foodies' Delight: A Taste of Italy & Global Bites!
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Welcome to Foodies' Delight, where authentic Italian flavors meet irresistible junk food cravings!
            We've crafted a menu that promises to satisfy every palate.
          </p>
          <div className="w-32 h-1 bg-[#b53247] mx-auto mt-6 rounded-full"></div> {/* Decorative line */}
        </div>

        {/* Menu Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
          {/* Italian Classics Section */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-3xl font-bold text-[#b53247] mb-6 text-center border-b-2 border-[#b53247] pb-3">
              🍕 Italian Classics
            </h3>
            <p className="text-gray-700 mb-8 text-center">
              Indulge in the rich, comforting tastes of Italy, crafted with fresh ingredients and traditional recipes.
            </p>
            {menuData.italian.map((item, index) => (
              <div key={index} className="flex justify-between items-baseline py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex-1 pr-4">
                  <h4 className="text-xl font-semibold text-gray-900 leading-tight">{item.name}</h4>
                  <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                </div>
                <span className="text-xl font-bold text-[#b53247]">{item.price}</span>
              </div>
            ))}
          </div>

          {/* Global Junk Bites Section */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-3xl font-bold text-[#b53247] mb-6 text-center border-b-2 border-[#b53247] pb-3">
              🍔 Global Junk Bites
            </h3>
            <p className="text-gray-700 mb-8 text-center">
              Dive into our selection of all-time favorite junk foods, perfect for a quick bite or a satisfying treat!
            </p>
            {menuData.junkFood.map((item, index) => (
              <div key={index} className="flex justify-between items-baseline py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex-1 pr-4">
                  <h4 className="text-xl font-semibold text-gray-900 leading-tight">{item.name}</h4>
                  <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                </div>
                <span className="text-xl font-bold text-[#b53247]">{item.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Beverages Section (Full Width) */}
        <div className="mt-12 bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-3xl font-bold text-[#b53247] mb-6 text-center border-b-2 border-[#b53247] pb-3">
            🥤 Beverages
          </h3>
          <p className="text-gray-700 mb-8 text-center">
            Quench your thirst with our refreshing drink selection.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
            {menuData.beverages.map((item, index) => (
              <div key={index} className="flex justify-between items-baseline py-2 border-b border-gray-100 last:border-b-0 md:last:border-b-0">
                <h4 className="text-lg font-semibold text-gray-900">{item.name}</h4>
                <span className="text-lg font-bold text-[#b53247]">{item.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-16 text-gray-600 text-sm">
          <p className="mb-2">Please inform our staff of any allergies.</p>
          <p className="font-semibold text-lg">We hope you enjoy your meal at Foodies' Delight!</p>
        </div>
      </div>
    </section>
  );
};

export default Menu;
