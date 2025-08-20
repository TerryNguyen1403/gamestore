// Load environment variables
require('dotenv').config();

// Import modules
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

//Import local modules
const connectDB = require('./connectDB');
const Product = require('./models/product');

// Initialize Express app
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

//Creating upload endpoint for images
app.use('/images', express.static('./upload/images'));

// Image Storage Engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage: storage
});

// API routes
app.get('/', (req, res) => {
    res.send('Express is running...')
});

app.post('/upload', upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, (error) => {
    if (!error) {
        console.log(`Server is running on port ${port}`);
    } else {
        console.log('Error: ', error);
    };
});