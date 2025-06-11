const jwt = require('jsonwebtoken');
const User = require('../models/user');

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key';

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);

      // Attach user to request object (excluding password)
      req.user = await User.findById(decoded.userId).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }
      next();
    } catch (error) {
      console.error('Token verification error:', error);
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Not authorized, token expired' });
      }
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Authorization Middleware (Role-based)
const authorize = (roles = []) => {
  // roles param can be a single role string (e.g., 'admin')
  // or an array of roles (e.g., ['admin', 'editor'])
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return (req, res, next) => {
    if (!req.user || !req.user.roles) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const hasRole = roles.some(role => req.user.roles.includes(role));

    if (!hasRole) {
      return res.status(403).json({ message: `User role '${req.user.roles.join(', ')}' is not authorized to access this resource. Required roles: ${roles.join(', ')}.` }); // "Forbidden"
    }
    next();
  };
};

module.exports = { protect, authorize };