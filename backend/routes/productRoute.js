const express = require('express');
const uploadImages = require('../middlewares/uploadImages');

require('dotenv').config();
const port = process.env.PORT || 4000;

const {
    addProduct,
    removeProduct,
    getAllProducts
} = require('../controllers/productController');

const router = express.Router();

router.post('/add', addProduct);
router.post('/remove', removeProduct);
router.get('/all', getAllProducts)
router.post('/upload', uploadImages.single('product'), (req, res) => {
    res.json({
        img_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

module.exports = router;