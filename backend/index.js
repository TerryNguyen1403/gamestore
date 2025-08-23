// Load environment variables
require('dotenv').config();

// Import modules
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

//Import connection to MongoDB
const connectDB = require('./connectDB');

// Import routes
const productRoute = require('./routes/productRoute');
const userRoute = require('./routes/userRoute');
const cartRoute = require('./routes/cartRoute');

// Initialize Express app
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// API routes
app.get('/', (req, res) => {
    res.send('Express is running...')
});

// Routes
app.use('/api/product', productRoute);
app.use('/api/user', userRoute);
app.use('/api/cart', cartRoute)

// Serve static files for images
app.use('/images', express.static(path.join(__dirname, 'upload/images')));

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, (error) => {
    if (!error) {
        console.log(`Server is running on port ${port}`);
    } else {
        console.log('Error: ', error);
    };
});