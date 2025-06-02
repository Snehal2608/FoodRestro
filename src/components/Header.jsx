import React from 'react';
import logo from '../assets/images/logo.png'; // Ensure this path is correct

const Header = () => {
  return (
    // Added 'fixed', 'top-0', 'left-0', 'right-0', 'w-full' to make the header stick to the top
    // 'z-50' ensures it stays above other content.
    <header className="bg-white py-4 shadow-sm fixed top-0 left-0 right-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Logo */}
        <a href="/">
          {/* Increased logo size to h-16 as in the desired image (or adjust further if needed) */}
          <img src={logo} alt="Foodies Logo" className="h-16 w-auto" />
        </a>

        {/* Navigation and Call to Action */}
        {/* Used gap-x-10 to create space between the <ul> and the <button> */}
        <nav className="flex items-center gap-x-10">

          {/* Navigation Items */}
          {/* flex makes them horizontal, gap-x-8 adds space between them,
              list-none m-0 p-0 removes default browser list styling */}
          <ul className="flex items-center gap-x-8 list-none m-0 p-0">
            {['Home', 'About Us', 'Explore Foods', 'Reviews', 'FAQ'].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase().replace(/\s+/g, '')}`}
                  // font-bold, text-lg, text-black for appearance
                  // hover:text-gray-700 for interaction
                  // transition duration-300 ease-in-out for smooth hover effect
                  // px-4 py-2 for padding around each link text, making it a larger clickable area
                  className="font-bold text-lg text-black hover:text-gray-700 transition duration-300 ease-in-out px-4 py-2"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>

          {/* Call to Action Button */}
          <button className="bg-[#b53247] text-white font-bold py-2 px-5 rounded-md hover:bg-[#9c293b] transition duration-300 ease-in-out text-lg focus:outline-none focus:ring-2 focus:ring-[#b53247] focus:ring-opacity-50">
            1200 345 123
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
