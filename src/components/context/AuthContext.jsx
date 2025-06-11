// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom'; // REMOVE THIS LINE

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // const navigate = useNavigate(); // REMOVE OR COMMENT OUT THIS LINE

  useEffect(() => {
    // Simulate auth check
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async ({ email, password }) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email === 'user@example.com' && password === 'password') {
          localStorage.setItem('token', 'dummy-token');
          // Important: Ensure the user object stored here has roles if you plan to use them in ProtectedRoute
          localStorage.setItem('user', JSON.stringify({ username: 'DummyUser', email, roles: ['user'] })); // Added roles
          setIsAuthenticated(true);
          setUser({ username: 'DummyUser', email, roles: ['user'] }); // Added roles
          resolve({ success: true });
        } else {
          resolve({ success: false, error: 'Invalid credentials' });
        }
      }, 500);
    });
  };

  const register = async ({ username, email, password }) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Dummy registration logic
        if (username && email && password) {
          // In a real app, you'd send this to a backend and potentially
          // auto-login the user or redirect them to login.
          resolve({ success: true, message: 'Registration successful! Please log in.' });
        } else {
          resolve({ success: false, error: 'Missing information' });
        }
      }, 500);
    });
  };

  const logout = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        setUser(null);
        resolve({ success: true });
      }, 300);
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};