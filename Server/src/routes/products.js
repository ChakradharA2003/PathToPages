const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { protect, adminOnly } = require('../middleware/auth');
const validate = require('../middleware/validateRequest');


router.get('/', productController.listProducts);
router.get('/:id', productController.getProduct);


// admin
router.post('/', protect, adminOnly, validate(['name', 'price', 'type']), productController.createProduct);
router.put('/:id', protect, adminOnly, productController.updateProduct);
router.delete('/:id', protect, adminOnly, productController.deleteProduct);


module.exports = router;