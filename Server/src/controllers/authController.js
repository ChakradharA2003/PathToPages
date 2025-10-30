const jwt = require('jsonwebtoken');
const asyncHandler = require('../middleware/asyncHandler');
const User = require('../models/User');

// 🔐 Generate JWT token (2 years expiry)
const signToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '2y' } // 2 years expiry
  );
};

// 🧾 Register User
exports.register = asyncHandler(async (req, res) => {
  const { name, mobile, email, fullAddress, cart } = req.body;

  // ✅ Validate required fields
  if (!name || !mobile || !email || !fullAddress) {
    return res.status(400).json({
      success: false,
      error: 'All required fields (name, mobile, email, fullAddress) must be provided',
    });
  }

  // 🔍 Check if email already exists
  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(400).json({
      success: false,
      error: 'Email already registered',
    });
  }

  // 🧠 Create new user
  const user = await User.create({
    name,
    mobile,
    email,
    fullAddress,
    cart: cart || {},
  });

  // 🔐 Generate token
  const token = signToken(user);

  // 🚀 Send response with full user data
  res.status(201).json({
    success: true,
    data: {
      user,
      accessToken: token,
    },
  });
});

// 🔑 Login User (Email only)
exports.login = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      error: 'Email is required to login',
    });
  }

  // 🔍 Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      success: false,
      error: 'Email not found. Please register first.',
    });
  }

  // 🔐 Generate token
  const token = signToken(user);

  // 🚀 Send response with all user details
  res.json({
    success: true,
    data: {
      user,
      accessToken: token,
    },
  });
});
