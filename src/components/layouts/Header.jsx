import React from 'react';
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
  // Check token directly from localStorage to determine authentication status
  const isAuthenticated = localStorage.getItem('token'); 

  /**
   * Handles the logout button click.
   * Calls the onLogout function passed from App.jsx and redirects to the login page.
   */
  const handleLogoutClick = () => {
    onLogout(); // Calls the logout function provided by App.jsx
    navigate('/login'); // Redirects the user to the login page
  };

  return (
    // Header styling updated to match the image: no shadow, minimal padding, white background, no explicit borders
    <header className="bg-white text-gray-800 py-2 px-8 font-inter flex flex-col sm:flex-row justify-between items-center w-full">
      {/* Logo Section - Uses the imported logo image */}
      <div className="flex items-center mb-4 sm:mb-0">
        <img 
          // Using the imported 'logo' variable as the src. This is the correct way
          // to reference images that are part of your source directory in React.
          src={logo} 
          alt="Foodies Logo" 
          className="h-12 w-auto" // Increased logo height to h-12 for a larger size
          // The onError fallback is less critical now as the image is directly imported,
          // but kept for robustness in case the import fails for other reasons.
          onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/100x40/cccccc/000000?text=Logo+Error"; }} 
        />
      </div>

      {/* Navigation Links - Centered on larger screens, adjusted spacing and font-weight */}
      <nav className="flex-grow flex justify-center sm:justify-center"> 
        {/* Changed font-normal to font-semibold to make the navigation links semi-bold */}
        <ul className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-10 text-base font-semibold"> 
          <li><Link to="#home" className="hover:text-red-600 transition-colors duration-200 block text-center py-1">Home</Link></li>
          <li><Link to="#aboutus" className="hover:text-red-600 transition-colors duration-200 block text-center py-1">About Us</Link></li>
          <li><Link to="#explorefoods" className="hover:text-red-600 transition-colors duration-200 block text-center py-1">Explore Foods</Link></li>
          <li><Link to="#reviews" className="hover:text-red-600 transition-colors duration-200 block text-center py-1">Reviews</Link></li>
          <li><Link to="#faq" className="hover:text-red-600 transition-colors duration-200 block text-center py-1">FAQ</Link></li>
        </ul>
      </nav>

      {/* Buttons Section - Phone Number button is now always visible */}
      <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4"> 
        {/* Phone Number Button - Always visible */}
        <button
          className="bg-red-600 hover:bg-red-700 text-white py-2 px-5 rounded-lg text-base transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75 font-normal"
        >
          1200 345 123
        </button>

        {/* Conditional Login/Logout Buttons */}
        {isAuthenticated ? (
          <button
            onClick={handleLogoutClick} 
            // Styling to match the red button in the image: rounded-lg, specific background color, text styling
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-5 rounded-lg text-base transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75 font-normal"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate('/login')}
            // Styling for the Login button (assuming it should match the Logout button's aesthetic when present)
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-5 rounded-lg text-base transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 font-normal"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
