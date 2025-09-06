const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validateRequest');


router.use(protect);
router.get('/', cartController.getCart);
router.post('/item', validate(['productId']), cartController.addItem);
router.put('/item', validate(['productId', 'quantity']), cartController.updateItem);
router.post('/apply-coupon', validate(['code']), cartController.applyCoupon);
router.delete('/clear', cartController.clearCart);


module.exports = router;