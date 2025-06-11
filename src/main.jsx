// src/index.js (or equivalent entry file)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from '../src/components/context/AuthContext'; // Import AuthProvider
import './index.css'; // Your global styles

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider> {/* Wrap your App with AuthProvider */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);