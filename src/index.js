// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Assuming you have a global CSS file
// REMOVE these imports if they were here:
// import { BrowserRouter } from 'react-router-dom';
// import { AuthProvider } from './components/context/AuthContext.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Only App remains, BrowserRouter will be inside App */}
    <App />
  </React.StrictMode>
);