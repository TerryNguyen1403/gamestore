const User = require('../models/user');

// Thêm sản phẩm vào giỏ hàng
const addToCart = async (req, res) => {
    let userData = await User.findOne({_id: req.user.id});
    userData.cartData[req.body.productId] += 1;

    await User.findOneAndUpdate(
        { _id: req.user.id },
        { cartData: userData.cartData }
    );

    res.status(200).json({
        message: 'Đã thêm sản phẩm vào giỏ hàng'
    });
};

// Xóa sản phẩm khỏi giỏ hàng
const removeFromCart = async (req, res) => {
    let userData = await User.findOne({ _id: req.user.id });

    if (userData.cartData[req.body.productId] > 0) {
        userData.cartData[req.body.productId] -= 1;
    }

    await User.findOneAndUpdate(
        { _id: req.user.id },
        { cartData: userData.cartData }
    )

    res.status(200).json({
        message: 'Xóa sản phẩm khỏi giỏ hàng'
    })
};

// Lấy dữ liệu giỏ hàng
const getCart = async ( req, res) => {
    let userData = await User.findOne({ _id: req.user.id });
    res.json(userData.cartData);
};

module.exports = {
    addToCart,
    removeFromCart,
    getCart
};