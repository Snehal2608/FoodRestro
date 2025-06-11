import React, { createContext, useState, useContext, useEffect }
from 'react';
import { loginUser as apiLogin, registerUser as apiRegister, logoutUser as apiLogout } from '../services/api'; // Adjust path

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true); // To check initial auth status

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const response = await apiLogin(credentials);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setToken(response.data.token);
      setUser(response.data.user);
      return response;
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message || error.message);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await apiRegister(userData);
       // Optionally log in the user directly after registration
      if (response.data.token && response.data.user) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setToken(response.data.token);
        setUser(response.data.user);
      }
      return response;
    } catch (error) {
      console.error('Registration failed:', error.response?.data?.message || error.message);
      throw error;
    }
  };

  const logout = async () => {
    await apiLogout(); // This clears localStorage in api.js
    setToken(null);
    setUser(null);
    // Optionally: redirect to login page via useNavigate() hook in the component
  };

  const isAuthenticated = !!token;
  const hasRole = (roles) => {
    if (!user || !user.roles) return false;
    if (typeof roles === 'string') roles = [roles];
    return roles.some(role => user.roles.includes(role));
  };


  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isAuthenticated, hasRole, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);