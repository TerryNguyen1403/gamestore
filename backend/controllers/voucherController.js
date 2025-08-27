const Voucher = require('../models/voucher');
const Cart = require('../models/cart');

const jwt = require('jsonwebtoken');
require('dotenv').config();

// Lấy giá trị Voucher
const getVoucher = async (req, res) => {
    const { voucherCode  } = req.body;

    try {
        // Tìm và update appliedVoucher field cho collection carts
        const token = req.headers['auth-token'];

        let userId;
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            userId = decoded.user.id;
        } catch (error) {
            return res.status(403).json({
                success: false,
                message: 'Token không hợp lệ'
            });
        }

        const validVoucher = await Voucher.findOne({ voucherCode });

        if (!validVoucher){
            // Nếu voucher không tồn tại
            await Cart.findOneAndUpdate(
                { userId: userId},
                { appliedVoucher: null },
                { upsert: true }
            );

            return res.status(404).json({
                success: false,
                message: 'Voucher ko tồn tại'
            });
        }

        // Kiểm tra thời hạn voucher
        const expiryDate = new Date(validVoucher.expiryDate);
        const currentDate = new Date();
        if (currentDate > expiryDate){
            await Cart.findOneAndUpdate(
                { userId: userId},
                { appliedVoucher: null }
            );

            return res.status(400).json({
                success: false,
                message: 'Mã giảm giá đã hết hạn'
            });
        }

        await Cart.findOneAndUpdate(
            { userId: userId},
            { appliedVoucher: voucherCode }
        );

        return res.status(200).json({
            success: true,
            discount: validVoucher.discount,
            message: 'Áp mã giảm giá thành công'
        })
    } catch (error) {
        console.error('Error in getVoucher:', error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi server'
        });
    }
};

// Thêm Voucher cho trang Admin
const addVoucher = async (req, res) => {
    const { voucherCode, discount, expiryDate } = req.body;

    const voucher = new Voucher({
        voucherCode,
        discount,
        expiryDate: new Date(expiryDate)
    });

    await voucher.save();
    res.status(201).json({ message: "Voucher created", voucher });
}

module.exports = {
    getVoucher,
    addVoucher
};