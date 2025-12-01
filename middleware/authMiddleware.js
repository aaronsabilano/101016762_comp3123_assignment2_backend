// middleware/authMiddleware.js
// Checks for JWT token in Authorization header

const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Expect header like: "Bearer token_here"
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');

    // Attach user id to request in case we need it later
    req.userId = decoded.id;

    next();
  } catch (error) {
    console.error('Auth error:', error.message);
    return res.status(401).json({ message: 'Not authorized, token invalid' });
  }
};

module.exports = authMiddleware;
