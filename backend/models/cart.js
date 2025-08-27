const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        productId: {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            requried: true,
            min: 1,
            default: 1
        }
    }],
    total: {
        type: Number,
        default: 0
    },
    appliedVoucher: {
        type: String,
        default: null
    }
}, { timestamps: true });

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;