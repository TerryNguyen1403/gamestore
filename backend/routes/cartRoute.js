const express = require('express');
const router = express.Router();

const fetchUser = require('../middlewares/fetchUser');
const {
    addToCart,
    removeFromCart,
    getCart
} = require('../controllers/cartController');

router.post('/add-to-cart', fetchUser, addToCart);
router.post('/remove-from-cart', fetchUser, removeFromCart);
router.post('/get-cart', fetchUser, getCart);

module.exports = router;