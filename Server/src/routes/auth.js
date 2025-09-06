const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validate = require('../middleware/validateRequest');
const { protect } = require('../middleware/auth');


router.post('/register', validate(['name', 'email', 'password']), authController.register);
router.post('/login', validate(['email', 'password']), authController.login);
router.get('/me', protect, authController.me);


module.exports = router;