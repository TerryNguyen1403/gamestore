const User = require('../models/user');
const jwt = require('jsonwebtoken');

require('dotenv').config();

// Register user
const registerUser = async (req, res) => {
    let check = await User.findOne({
        email: req.body.email
    });

    if (check){
        return res.status(400).json({
            message: 'Email đã tồn tại'
        });
    }

    let cart = [];

    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        cartData: cart
    });

    await user.save();

    const data = {
        user: {
            id: user.id
        }
    }

    const token = jwt.sign(data, process.env.JWT_SECRET);
    res.status(200).json({ token });
};

// Login user
const loginUser = async (req, res) => {
    let user = await User.findOne({
        email: req.body.email
    });

    if(!user){
        return res.status(400).json({
            message: 'Email không tồn tại'
        });
    }else {
        // Check password
        const isMatch = req.body.password === user.password;
        if(!isMatch){
            return res.status(400).json({
                message: 'Mật khẩu không chính xác'
            });
        }else {
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, process.env.JWT_SECRET);
            res.status(200).json({ token });
        }
    }
}

module.exports = {
    registerUser,
    loginUser
};