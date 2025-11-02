const express = require('express');
const router = express.Router();
const protectCustomer = require('../middleware/authMiddleware');
const protect = protectCustomer;

// Import controllers
const {
  updateUserInfo,
  addOrUpdateCartItem,
  removeCartItem,
   getUserCart,
} = require('../controllers/userController');

router.get('/:userId/cart',protect, getUserCart);

// ✏️ Update user details (email, mobile, fullAddress)
router.put('/:userId',protect, updateUserInfo);


// ➕ Add or Update product in user's cart
router.post('/:userId/cart/:productId',protect, addOrUpdateCartItem);

// ❌ Remove product from user's cart
router.delete('/:userId/cart/:productId',protect, removeCartItem);

module.exports = router;
