const jwt = require('jsonwebtoken');
const asyncHandler = require('../middleware/asyncHandler');
const User = require('../models/User');


const signToken = (user) => {
    return jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
};


exports.register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ success: false, error: 'Email already registered' });
    const user = await User.create({ name, email, password });
    const token = signToken(user);
    res.status(201).json({ success: true, data: { user: { id: user._id, name: user.name, email: user.email }, token } });
});


exports.login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, error: 'Invalid credentials' });
    const match = await user.matchPassword(password);
    if (!match) return res.status(400).json({ success: false, error: 'Invalid credentials' });
    const token = signToken(user);
    res.json({ success: true, data: { user: { id: user._id, name: user.name, email: user.email }, token } });
});


exports.me = asyncHandler(async (req, res) => {
    res.json({ success: true, data: req.user });
});