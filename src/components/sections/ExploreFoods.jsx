import React from 'react';
// Import your images from the specified path
import img3 from '../images/img/img-3.jpg'; 
import img4 from '../images/img/img-4.jpg'; 
import img5 from '../images/img/img-5.jpg'; 


function ExploreFoods() {
  // Define a reusable button style for the "Order Now" buttons
  const orderBtnClasses = "bg-[#b53247] text-white text-base py-2.5 px-6 rounded-md hover:bg-[#9c293b] transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#b53247] focus:ring-opacity-50";

  // Data for your food cards
  const foodItems = [
    {
      id: 1,
      image: img3,
      title: "Rainbow Vegetable Standards",
      time: "15 - 20 Minutes",
      serves: "1",
      currentPrice: "10.50",
      oldPrice: "11.70"
    },
    {
      id: 2,
      image: img4,
      title: "Vegetarian burger",
      time: "30 - 45 Minutes",
      serves: "1",
      currentPrice: "9.20",
      oldPrice: "10.70"
    },
    {
      id: 3,
      image: img5,
      title: "Raspberry Stuffed French Toast",
      time: "15 - 20 Minutes",
      serves: "1",
      currentPrice: "12.50",
      oldPrice: "13.70"
    },
    // Add more food items here following the same structure
    // {
    //   id: 4, // Ensure unique ID
    //   image: your_new_image_import, // e.g., img6
    //   title: "New Delicious Dish",
    //   time: "XX - YY Minutes",
    //   serves: "Z",
    //   currentPrice: "XX.XX",
    //   oldPrice: "YY.YY"
    // },
  ];

  return (
    <section id="explorefoods" className="py-16 md:py-24 bg-gray-50"> {/* Section background and vertical padding */}
      <div className="container mx-auto px-4"> {/* Main container for cards, centered with horizontal padding */}

        {/* Food Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> {/* Responsive grid for cards with gaps */}
          {foodItems.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden"> {/* Card styling with rounded corners and shadow */}
              <img src={item.image} className="w-full h-48 object-cover rounded-t-lg" alt={item.title} /> {/* Image with rounded top corners */}
              <div className="p-4"> {/* Padding for content inside the card */}
                <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                <p className="text-sm text-gray-600 mb-2">Time: {item.time} | Serves: {item.serves}</p>
                <div className="flex items-baseline mb-4"> {/* Price display */}
                  <span className="font-bold text-lg text-[#b53247]">${item.currentPrice}</span>
                  <del className="text-gray-500 text-sm ml-2">${item.oldPrice}</del>
                </div>
                <button className={orderBtnClasses}>Order Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ExploreFoods;