const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({ error: 'Please authenticate using a valid token' });
    } else {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded.user;
            next();
        } catch (error) {
            res.status(401).json({ error: 'Please authenticate using a valid token'})
        }
    }
    
};

module.exports = fetchUser;