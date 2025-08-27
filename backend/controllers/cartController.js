const Cart = require('../models/cart');
const Product = require('../models/product');

// Thêm sản phẩm vào giỏ hàng
const addToCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.user.id;

        let cart = await Cart.findOne({ userId });

        if (!cart){
            // Tạo giỏ hàng nếu chưa có
            cart = new Cart({
                userId,
                items: []
            })
        }

        // Kiểm tra sản phẩm đã có trong giỏ chưa
        const existingItem = cart.items.find(item => item.productId == productId);

        if (existingItem){
            existingItem.quantity += 1;
        } else {
            cart.items.push({
                productId,
                quantity: 1
            })
        }

        await cart.save();
        res.status(200).json({
            success: true,
            message: 'Thêm sản phẩm thành công'
        })

    } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server'
        })
    }
};

// Xóa sản phẩm khỏi giỏ hàng
const removeFromCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.body;

        const cart = await Cart.findOne({ userId });

        if (!cart){
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy giỏ hàng'
            });
        }

        // Tìm index của sản phẩm trong giỏ
        const itemIndex = cart.items.findIndex(item => item.productId === productId);

        if (itemIndex > -1) {
            if (cart.items[itemIndex].quantity > 1) {
                cart.items[itemIndex].quantity -= 1;
            } else {
                cart.items.splice(itemIndex, 1);
            }
        }

        await cart.save();
        res.status(200).json({
            success: true,
            message: 'Xóa sản phẩm thành công'
        })


    } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server'
        })
    }
};

// Lấy dữ liệu giỏ hàng
const getCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(200).json({}); // Trả về object rỗng nếu chưa có giỏ hàng
        }

        // Convert cart items sang format cũ để tương thích với frontend
        const cartData = {};
        cart.items.forEach(item => {
            cartData[item.productId] = item.quantity;
        });

        res.status(200).json(cartData);

    } catch (error) {
        console.error('Error in getCart:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server'
        });
    }
};

// Reset voucher
const resetVoucher = async (req, res) => {
    try {
        const userId = req.user.id;
        const cart = await Cart.findOne({ userId });
        if (!cart) return;
        
        cart.appliedVoucher = null;
        await cart.save();

        res.status(200).json({
            success: true,
            message: 'Voucher đã được reset'
        })
    } catch (error) {
        console.error('Error in resetVoucher:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server'
        });
    }
}

module.exports = {
    addToCart,
    removeFromCart,
    getCart,
    resetVoucher
};