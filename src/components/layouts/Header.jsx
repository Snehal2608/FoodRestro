import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import { useNavigate, Link } from 'react-router-dom';
import logo from '../images/logo.png'; // Import the logo image directly

/**
 * Header Component
 * Displays the website's navigation, logo, and conditional login/logout/phone number button.
 *
 * @param {object} props - The component props.
 * @param {function} props.onLogout - Callback function to handle user logout.
 */
const Header = ({ onLogout }) => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('token');
  const [showOrderHistoryLink, setShowOrderHistoryLink] = useState(false); // New state for order history link

  // Effect to check if orders have been placed (from localStorage)
  useEffect(() => {
    const hasOrders = localStorage.getItem('hasOrders');
    if (hasOrders === 'true') {
      setShowOrderHistoryLink(true);
    } else {
      setShowOrderHistoryLink(false);
    }
  }, [isAuthenticated]); // Re-check when auth status changes

  /**
   * Handles the logout button click.
   * Calls the onLogout function passed from App.jsx and redirects to the login page.
   */
  const handleLogoutClick = () => {
    onLogout(); // Calls the logout function provided by App.jsx
    localStorage.removeItem('hasOrders'); // Clear order history flag on logout
    setShowOrderHistoryLink(false); // Hide link immediately
    navigate('/login'); // Redirects the user to the login page
  };

  /**
   * Handles navigation link clicks to smoothly scroll to the target section,
   * accounting for the sticky header's height.
   * @param {Event} event - The click event.
   * @param {string} id - The ID of the target section.
   */
  const handleNavLinkClick = (event, id) => {
    event.preventDefault(); // Prevent default Link behavior (which would jump instantly)
    const targetElement = document.getElementById(id);
    if (targetElement) {
      // Get the actual height of the sticky header
      const headerElement = document.querySelector('header');
      const headerHeight = headerElement ? headerElement.offsetHeight : 0;

      // Calculate the scroll position: element's top position minus header height
      const offsetTop = targetElement.offsetTop - headerHeight;

      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth' // Ensure smooth scrolling
      });
    }
  };

  return (
    // Header styling: sticky, top-0, z-50 for a sticky header.
    // Vertical padding py-1 to decrease overall height.
    <header className="bg-white text-gray-800 py-1 px-8 font-inter flex flex-col sm:flex-row justify-between items-center w-full sticky top-0 z-50">
      {/* Logo Section - Uses the imported logo image */}
      <div className="flex items-center mb-0 sm:mb-0">
        <img
          src={logo}
          alt="Foodies Logo"
          className="h-12 w-auto" // Increased logo height from h-10 to h-12
          onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/100x40/cccccc/000000?text=Logo+Error"; }}
        />
      </div>

      {/* Navigation Links - Centered on larger screens, adjusted spacing and font-weight */}
      <nav className="flex-grow flex justify-center sm:justify-center">
        {/* Changed font-normal to font-semibold for semi-bold navigation links */}
        <ul className="flex flex-col sm:flex-row space-y-0 sm:space-y-0 sm:space-x-10 text-base font-semibold"> {/* Increased space-x from 8 to 10 and text size from sm to base */}
          <li><Link to="#home" onClick={(e) => handleNavLinkClick(e, 'home')} className="hover:text-red-600 transition-colors duration-200 block text-center py-1">Home</Link></li>
          <li><Link to="#aboutus" onClick={(e) => handleNavLinkClick(e, 'aboutus')} className="hover:text-red-600 transition-colors duration-200 block text-center py-1">About Us</Link></li>
          <li><Link to="#explorefoods" onClick={(e) => handleNavLinkClick(e, 'explorefoods')} className="hover:text-red-600 transition-colors duration-200 block text-center py-1">Explore Foods</Link></li>
          <li><Link to="#reviews" onClick={(e) => handleNavLinkClick(e, 'reviews')} className="hover:text-red-600 transition-colors duration-200 block text-center py-1">Reviews</Link></li>
          <li><Link to="#faq" onClick={(e) => handleNavLinkClick(e, 'faq')} className="hover:text-red-600 transition-colors duration-200 block text-center py-1">FAQ</Link></li>
          {/* NEW: Order History Link - Conditionally rendered */}
          {showOrderHistoryLink && (
            <li><Link to="/order-history" className="hover:text-red-600 transition-colors duration-200 block text-center py-1">Order History</Link></li>
          )}
        </ul>
      </nav>

      {/* Buttons Section - Phone Number button is now always visible */}
      <div className="mt-0 sm:mt-0 flex flex-col sm:flex-row space-y-0 sm:space-y-0 sm:space-x-4"> {/* Increased space-x from 3 to 4 */}
        {/* Phone Number Button - Always visible, styled to match the image's red button */}
        <button
          className="bg-red-600 hover:bg-red-700 text-white py-2 px-5 rounded-lg text-base transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75 font-normal" // Increased padding and text size
        >
          1200 345 123
        </button>

        {/* Conditional Login/Logout Buttons - Based on isAuthenticated state */}
        {isAuthenticated ? (
          <button
            onClick={handleLogoutClick}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-5 rounded-lg text-base transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75 font-normal" // Increased padding and text size
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-5 rounded-lg text-base transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 font-normal" // Increased padding and text size
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
