const Product = require('../models/product');

// Add product
const addProduct = async (req, res) => {
    let products = await Product.find({});
    let id;

    if (products.length > 0) {
        let lastProduct = products.slice(-1)[0];
        id = lastProduct.id + 1;
    } else {
        id = 1;
    }

    const newProduct = new Product({
        id: id,
        name: req.body.name,
        category: req.body.category,
        image: req.body.image,
        new_price: req.body.new_price,
        old_price: req.body.old_price
    })

    await newProduct.save();
    res.status(200).json({
        message: 'Product added successfully',
        newProduct
    })
};

// Remove product
const removeProduct = async (req, res) => {
    await Product.findOneAndDelete({
        id: req.body.id
    });
    res.json({
        message: 'Product removed successfully'
    })
};

// Get all products
const getAllProducts = async (req, res) => {
    const allProducts = await Product.find({});
    res.json(allProducts);
}

module.exports = {
    addProduct,
    removeProduct,
    getAllProducts
};