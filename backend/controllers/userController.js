const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

require('dotenv').config();

// Register user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: 'Vui lòng điền đầy đủ thông tin'
        });
    };

    // Kiểm tra email đã tồn tại chưa
    let check = await User.findOne({
        email: req.body.email
    });

    if (check){
        return res.status(400).json({
            message: 'Email đã tồn tại'
        });
    }

    // Hash password trước khi lưu vào DB
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: name,
        email: email,        
        password: hashedPassword
    });

    try {
        await user.save();

        const data = {
            user: {
                id: user.id
            }
        }

        const token = jwt.sign(data, process.env.JWT_SECRET);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500);
        throw new Error('Error: ', error);
    }
};

// Login user
const loginUser = async (req, res) => {
    const { password } = req.body;

    //  Kiểm tra mail
    let user = await User.findOne({
        email: req.body.email
    });

    if(!user){
        return res.status(400).json({
            message: 'Người dùng không tồn tại'
        });
    }else {
        // Check password
        const isMatch = bcrypt.compare(password, user.password);
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