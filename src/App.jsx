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

// Import authentication components
import Login from './components/auth/Login.jsx';
import Signup from './components/auth/Signup.jsx'; // Assuming this is for registration
import ProtectedRoute from './components/auth/ProtectedRoute.jsx'; // Your custom protected route component

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

    {/* Home section: The initial landing view for authenticated users */}
    <section id="home">
      <Home onViewMenuClick={onViewMenuClick} />
    </section>

    {/* Counter section: Example section for displaying statistics or dynamic numbers */}
    <section>
      <Counter />
    </section>

    {/* About Us section: Provides information about the website or organization */}
    <section id="aboutus">
      <About />
    </section>

    {/* Story section: A narrative or descriptive content section */}
    <section>
      <Story />
    </section>

    {/* Explore Foods section: Showcases various food items or categories */}
    <section id="explorefoods">
      <ExploreFoods />
    </section>

    {/* Testimonial section: Displays customer reviews or endorsements */}
    <section id="reviews">
      <Testimonial />
    </section>

    {/* Menu section: Conditionally rendered based on the 'showMenu' state, typically toggled by a button */}
    {showMenu && (
      <section id="menu">
        <Menu />
      </section>
    )}

    {/* FAQ section: Frequently Asked Questions and their answers */}
    <section id="faq">
      <FAQ />
    </section>
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
   */
  useEffect(() => {
    if (showMenu) {
      const timer = setTimeout(() => {
        const menuSection = document.getElementById('menu');
        if (menuSection) {
          menuSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
      // For a robust application, you'd also want to:
      // 1. Decode the token to get user info (e.g., using jwt-decode)
      // 2. Potentially send a request to your backend to validate the token's expiry/integrity
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false); // Ensure isAuthenticated is false if no token is found
    }
    setLoadingAuth(false); // Mark authentication check as complete
  }, []); // Empty dependency array means this effect runs only once after the initial render

  /**
   * Callback function passed to the Login component.
   * It's called when a user successfully logs in, updating the 'isAuthenticated' state.
   */
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    // Note: The navigation to '/' after login is handled directly within the Login component itself.
  };

  /**
   * Handles the logout process.
   * Removes the authentication token from localStorage and updates the 'isAuthenticated' state.
   */
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the stored token from browser storage
    setIsAuthenticated(false); // Set authentication status to false
    // You might optionally navigate to the login page here if you want an explicit redirect after logout.
    // For example: navigate('/login'); if you import useNavigate here.
  };

  // Display a loading indicator while the initial authentication check is in progress
  if (loadingAuth) {
    return <div className="flex items-center justify-center h-screen text-xl">Loading application...</div>;
  }

  return (
    <Router>
      <div className="bg-white text-black font-inter">
        <Routes>
          {/* Public Route: Login Page */}
          {/* Passes handleLoginSuccess to Login component to update app's auth state */}
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          
          {/* Public Route: Signup Page */}
          {/* Currently a dummy route, assuming Signup component handles its own logic */}
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes: Routes wrapped by ProtectedRoute are only accessible to authenticated users */}
          {/* ProtectedRoute uses the 'isAuthenticated' prop to determine access */}
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            {/* Main Application Homepage */}
            {/* This route renders the MainWebsiteContent component when the user is authenticated and at the root path */}
            <Route
              path="/"
              element={
                <MainWebsiteContent
                  onViewMenuClick={handleViewMenuClick}
                  showMenu={showMenu}
                  onLogout={handleLogout} // Pass logout handler to MainWebsiteContent (and then to Header)
                />
              }
            />
            {/* Add more protected routes here, e.g., for user profile, dashboard, etc. */}
            {/* <Route path="/profile" element={<Profile />} /> */}
          </Route>

          {/* Catch-all Route: Handles any unmatched URLs */}
          {/* If authenticated, redirects to '/', otherwise redirects to '/login' */}
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
