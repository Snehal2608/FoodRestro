import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../api.js'; // Assuming API_BASE_URL is correctly defined here

/**
 * Login Component
 * Handles user login, authentication, and redirection upon success.
 *
 * @param {object} props - The component props.
 * @param {function} props.onLoginSuccess - Callback function to be called on successful login,
 * typically to update the authentication state in a parent component (App.js).
 */
const Login = ({ onLoginSuccess }) => {
  // Changed state variable from 'identifier' to 'email' to match backend expectation
  const [email, setEmail] = useState('');     
  const [password, setPassword] = useState('');     // State for password input
  const [error, setError] = useState('');           // State for displaying login error messages
  const navigate = useNavigate();                   // Hook for programmatic navigation

  /**
   * Handles the login form submission.
   * Prevents default form submission, sends credentials to the backend,
   * stores the received token (if successful), calls onLoginSuccess,
   * and navigates to the homepage.
   */
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form refresh
    setError(''); // Clear any previous error messages

    try {
      // CORRECTED: Sending 'email' instead of 'identifier' to match backend's expected payload
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email, // Changed from identifier to email
        password,
      });

      // Assuming the backend sends a 'token' in the response data upon successful login
      const token = response.data.token; 

      if (token) {
        // Store the authentication token in localStorage for persistence
        // App.js will later retrieve this token to check authentication status
        localStorage.setItem('token', token); 
        
        // Call the onLoginSuccess prop function. This will typically update
        // the `isAuthenticated` state in App.js.
        if (onLoginSuccess) {
          onLoginSuccess();
        }

        // After successful login and state update, navigate the user to the root path (homepage)
        navigate('/'); 
      } else {
        // Fallback error if a token is not received despite a successful API call
        setError('Login failed: No authentication token received from server.');
      }
    } catch (err) {
      // Handle different types of errors during the login process
      if (err.response) {
        // The server responded with a status code outside the 2xx range (e.g., 401, 403, 404, 500)
        // Display the error message provided by the backend, or a generic server error message
        setError(err.response.data.msg || 'Login failed: Server responded with an error.'); // Backend sends 'msg'
      } else if (err.request) {
        // The request was made but no response was received (e.g., network error, server down)
        setError('Login failed: No response from server. Please check your internet connection or the API URL.');
      } else {
        // Something else happened in setting up the request that triggered an error
        setError('Login failed: An unexpected error occurred.');
      }
      // Log the full error object for detailed debugging in the console
      console.error('Login error:', err); 
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4 rounded-md">Log In</h2> {/* Added rounded-md for aesthetic consistency */}
        {/* Display error message if 'error' state is not empty */}
        {error && <p className="text-red-500 text-sm mb-4 p-2 bg-red-100 rounded-md border border-red-200">{error}</p>} {/* Enhanced error styling */}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email"> {/* Changed htmlFor to 'email' */}
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email" // Changed id to 'email'
              type="email" // Changed type to 'email' for better validation and UX
              placeholder="Enter your email" // Updated placeholder
              value={email} // Changed value to 'email'
              onChange={(e) => setEmail(e.target.value)} // Changed onChange to 'setEmail'
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
              type="submit"
            >
              Log In
            </button>
            <Link
              to="/signup"
              className="inline-block align-baseline font-semibold text-sm text-blue-500 hover:text-blue-800 transition duration-150 ease-in-out"
            >
              Don't have an account? Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
