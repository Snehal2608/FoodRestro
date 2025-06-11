// src/components/auth/Profile.js
import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  return <div><h2>User Profile</h2>{user ? <p>Welcome, {user.username || user.email}!</p> : <p>Please log in.</p>}</div>;
};

export default Profile;
