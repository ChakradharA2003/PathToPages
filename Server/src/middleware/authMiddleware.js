const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protectCustomer = async (req, res, next) => {
  try {
    // 1️⃣ Check if Authorization header is present and properly formatted
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized - Token missing or malformed',
      });
    }

    // 2️⃣ Extract token
    const token = authHeader.split(' ')[1];

    // 3️⃣ Verify and decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded?.id || !decoded?.email) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized - Invalid token payload',
      });
    }

    // 4️⃣ Fetch the user from DB
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized - User not found',
      });
    }

    // 5️⃣ Attach user to request object for downstream use
    req.user = user;

    // 6️⃣ Optional: Ensure the token user matches requested userId (for security)
    if (req.params.userId && req.params.userId.toString() !== user._id.toString()) {
      return res.status(403).json({
        success: false,
        error: 'Forbidden - You cannot access or modify another user’s data',
      });
    }

    // ✅ All good → continue to controller
    next();
  } catch (error) {
    console.error('Auth Middleware Error:', error);
    return res.status(401).json({
      success: false,
      error: 'Unauthorized - Invalid or expired token',
    });
  }
};

module.exports = protectCustomer;
