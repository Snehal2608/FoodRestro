import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

/**
 * ProtectedRoute Component
 * This component guards routes, ensuring only authenticated users can access them.
 *
 * @param {object} props - The component props.
 * @param {boolean} props.isAuthenticated - A boolean indicating if the user is currently authenticated.
 * @returns {JSX.Element} Renders the child routes if authenticated, otherwise redirects to the login page.
 */
const ProtectedRoute = ({ isAuthenticated }) => {
  // If the user is NOT authenticated, redirect them to the /login page.
  // The 'replace' prop ensures that the login page replaces the current entry in the history stack,
  // preventing users from simply going "back" to a protected page after being redirected.
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If the user IS authenticated, render the nested routes.
  // <Outlet /> is used here because ProtectedRoute is set up as a layout route in App.js
  // (<Route element={<ProtectedRoute ... />}>). It acts as a placeholder for child routes.
  return <Outlet />;
};

export default ProtectedRoute;
