import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api'; 
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add JWT token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const registerUser = (userData) => apiClient.post('/auth/register', userData);
export const loginUser = (credentials) => apiClient.post('/auth/login', credentials);
export const logoutUser = () => {
  // No specific API call needed for basic JWT logout, just clear client-side token
  // If backend has a token denylist, you would call an API endpoint here.
  localStorage.removeItem('token');
  localStorage.removeItem('user'); // Also remove user info
  // Optionally, notify backend if using a denylist: apiClient.post('/auth/logout');
  return Promise.resolve();
};

export const getUserProfile = () => apiClient.get('/data/profile');
export const getAdminData = () => apiClient.get('/data/admin');