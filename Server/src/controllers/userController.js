const asyncHandler = require('../middleware/asyncHandler');
const User = require('../models/User');
const Product = require('../models/Product');

// 🧾 Edit user info
exports.updateUserInfo = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { email, mobile, fullAddress } = req.body;

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ success: false, error: 'User not found' });

  if (email) user.email = email.toLowerCase().trim();
  if (mobile) user.mobile = mobile;
  if (fullAddress) user.fullAddress = fullAddress;

  await user.save();
  res.json({ success: true, message: 'User info updated', data: user });
});

// 🛍️ Get user's cart
exports.getUserCart = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ success: false, error: 'User not found' });
  }

  res.json({
    success: true,
    message: 'Cart fetched successfully',
    data: {
        id: user._id,
        cart: user.cart || []},
  });
});



// 🛒 Add or update a product in cart
exports.addOrUpdateCartItem = asyncHandler(async (req, res) => {
  const { userId, productId } = req.params;
  const { quantity } = req.body;

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ success: false, error: 'User not found' });

  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ success: false, error: 'Product not found' });

  const existingItem = user.cart.find(item => item._id.toString() === productId || item.productId?.toString() === productId);

  if (existingItem) {
    // Update quantity if product already exists in cart
    existingItem.quantity = quantity;
  } else {
    // Add full product object along with quantity
    const productData = product.toObject();
    productData.quantity = quantity;
    user.cart.push(productData);
  }

  await user.save();
  res.json({ success: true, message: 'Cart updated successfully', data: user.cart });
});


// ❌ Remove product from cart
exports.removeCartItem = asyncHandler(async (req, res) => {
  const { userId, productId } = req.params;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ success: false, error: 'User not found' });
  }

  const existingItem = user.cart.find(
  item => item.productId?.toString() === productId.toString()
);

  if (!existingItem) {
    return res
      .status(404)
      .json({ success: false, error: 'Product not found in cart' });
  }

  user.cart = user.cart.filter(item => {
  return item.productId?.toString() !== productId.toString();
});

  await user.save();

  res.json({
    success: true,
    message: 'Product removed from cart'
  });
});

