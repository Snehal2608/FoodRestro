import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import components based on your provided file structure
import Header from './components/layouts/Header';
import Home from './components/sections/Home';
import Counter from './components/sections/Counter';
import About from './components/sections/About';
import Story from './components/sections/Story';
import ExploreFoods from './components/sections/ExploreFoods';
import Testimonial from './components/sections/Testimonial';
import Menu from './components/sections/Menu';
import FAQ from './components/sections/FAQ';
import Chatbot from './components/Chatbot'; // Import the Chatbot component

// Import authentication components
import Login from './components/auth/Login.jsx';
import Signup from './components/auth/Signup.jsx'; // Assuming this is for registration
import ProtectedRoute from './components/auth/ProtectedRoute.jsx'; // Your custom protected route component

// NEW: Import the OrderPage component
import OrderPage from './components/OrderPage';

/**
 * MainWebsiteContent Component
 * This component groups all the main sections of your single-page website.
 * It's rendered when the user is authenticated and on the root path '/'.
 *
 * @param {object} props - The component props.
 * @param {function} props.onViewMenuClick - Callback to handle showing the menu section.
 * @param {boolean} props.showMenu - State to control the visibility of the Menu section.
 * @param {function} props.onLogout - Callback to handle user logout.
 */
const MainWebsiteContent = ({ onViewMenuClick, showMenu, onLogout }) => (
  <>
    {/* Header component: Contains navigation links and logout button */}
    <Header onLogout={onLogout} />

    {/*
      Sections are rendered. 'pt-4' is included for general top padding.
      The programmatic scrolling in Header.jsx handles the correct offset for sticky header.
    */}
    <section id="home" className="pt-4">
      <Home onViewMenuClick={onViewMenuClick} />
    </section>

    {/* Counter section */}
    <section className="pt-4">
      <Counter />
    </section>

    <section id="aboutus" className="pt-4">
      <About />
    </section>

    {/* Story section */}
    <section className="pt-4">
      <Story />
    </section>

    <section id="explorefoods" className="pt-4">
      <ExploreFoods />
    </section>

    <section id="reviews" className="pt-4">
      <Testimonial />
    </section>

    {/* Menu section: Conditionally rendered */}
    {showMenu && (
      <section id="menu" className="pt-4">
        <Menu />
      </section>
    )}

    <section id="faq" className="pt-4">
      <FAQ />
    </section>

    {/* Chatbot Component - Rendered at the end of MainWebsiteContent */}
    {/* Pass the onViewMenuClick function to the Chatbot */}
    <Chatbot onViewMenuClick={onViewMenuClick} />
  </>
);

/**
 * App Component
 * The main component of your React application. It sets up routing,
 * manages global authentication state, and renders different parts of the UI
 * based on routes and user authentication status.
 */
function App() {
  const [showMenu, setShowMenu] = useState(false); // State to control Menu section visibility
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state
  const [loadingAuth, setLoadingAuth] = useState(true); // State to indicate if initial auth check is ongoing

  /**
   * Handles the click event for showing the menu.
   * Sets 'showMenu' to true, which triggers the rendering and scrolling to the Menu section.
   */
  const handleViewMenuClick = () => {
    setShowMenu(true);
  };

  /**
   * Effect hook to scroll to the menu section when 'showMenu' state becomes true.
   * A small timeout is used to ensure the component has rendered before attempting to scroll.
   * This now also accounts for the sticky header height.
   */
  useEffect(() => {
    if (showMenu) {
      const timer = setTimeout(() => {
        const menuSection = document.getElementById('menu');
        if (menuSection) {
          const headerElement = document.querySelector('header');
          const headerHeight = headerElement ? headerElement.offsetHeight : 0;
          const offsetTop = menuSection.offsetTop - headerHeight;

          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }, 100); // Delay to allow menu section to render

      return () => clearTimeout(timer); // Cleanup the timer on unmount or if showMenu changes
    }
  }, [showMenu]); // Dependency array: runs when 'showMenu' changes

  /**
   * Effect hook to check the authentication status when the component mounts.
   * It looks for an authentication token in localStorage.
   * In a real-world application, this token would typically be validated with the backend
   * to ensure it's still valid and not expired.
   */
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setLoadingAuth(false);
  }, []);

  /**
   * Callback function passed to the Login component.
   * It's called when a user successfully logs in, updating the 'isAuthenticated' state.
   */
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  /**
   * Handles the logout process.
   * Removes the authentication token from localStorage and updates the 'isAuthenticated' state.
   */
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  if (loadingAuth) {
    return <div className="flex items-center justify-center h-screen text-xl">Loading application...</div>;
  }

  return (
    <Router>
      <div className="bg-white text-black font-inter">
        <Routes>
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route
              path="/"
              element={
                <MainWebsiteContent
                  onViewMenuClick={handleViewMenuClick}
                  showMenu={showMenu}
                  onLogout={handleLogout}
                />
              }
            />
            {/* NEW: Route for the Order Page - accessible only if authenticated */}
            <Route path="/order" element={<OrderPage />} />
          </Route>
          <Route
            path="*"
            element={isAuthenticated ? <Navigate to="/" /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
