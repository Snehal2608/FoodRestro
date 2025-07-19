// backend/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Import your User model. Adjust path if necessary.

// Get JWT secret from environment variables, with a fallback for development
const JWT_SECRET = process.env.JWT_SECRET ;

// Authentication Middleware: Protects routes by verifying JWT token
const protect = async (req, res, next) => {
  let token;

  // Check if authorization header exists and starts with 'Bearer'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract token from "Bearer <token>"
      token = req.headers.authorization.split(' ')[1];

      // Verify token using the secret key
      const decoded = jwt.verify(token, JWT_SECRET);

      // Find the user by ID from the decoded token payload
      // Assuming your JWT payload has a 'userId' field
      // Select '-password' excludes the password hash from the user object
      req.user = await User.findById(decoded.userId).select('-password');

      // If user is not found (e.g., deleted from DB after token was issued)
      if (!req.user) {
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }

      // Proceed to the next middleware/route handler
      next();
    } catch (error) {
      console.error('Token verification error:', error);
      // Handle specific JWT errors
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Not authorized, token expired' });
      }
      // Generic token validation failure
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  // If no token is provided in the header
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Authorization Middleware: Restricts access based on user roles
const authorize = (roles = []) => {
  // Ensure roles is an array
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return (req, res, next) => {
    // Check if user object exists on request and has roles
    if (!req.user || !req.user.roles) {
      return res.status(401).json({ message: 'Not authorized, user or roles not found' });
    }

    // Check if the user has any of the required roles
    const hasRequiredRole = roles.some(role => req.user.roles.includes(role));

    // If user does not have the required role(s)
    if (!hasRequiredRole) {
      return res.status(403).json({
        message: `User role '${req.user.roles.join(', ')}' is not authorized to access this resource. Required roles: ${roles.join(', ')}.`,
      }); // 403 Forbidden
    }

    // User is authorized, proceed
    next();
  };
};

// Export both middlewares
export { protect, authorize };
