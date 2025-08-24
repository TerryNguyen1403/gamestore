const express = require('express');
const uploadImages = require('../middlewares/uploadImages');

require('dotenv').config();
const port = process.env.PORT || 4000;

const {
    addProduct,
    removeProduct,
    getAllProducts,
    getNewCollection,
    getPopularProducts,
    getRelatedProducts
} = require('../controllers/productController');

const router = express.Router();

router.post('/add-product', addProduct);
router.post('/remove-product', removeProduct);
router.get('/list-products', getAllProducts);
router.get('/new-collection', getNewCollection);
router.post('/upload-image', uploadImages.single('product'), (req, res) => {
    res.json({
        img_url: `http://localhost:${port}/images/${req.file.filename}`
    })
});
router.get('/popular-products', getPopularProducts);
router.get('/related-products/:platform', getRelatedProducts);

module.exports = router;