const Product = require('../models/product');

// [POST] Add product
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
        platform: req.body.platform,
        image: req.body.image,
        new_price: req.body.new_price,
        old_price: req.body.old_price
    })

    await newProduct.save();
    res.status(200).json({
        message: 'Thêm sản phẩm thành công',
        newProduct
    })
};

// [POST] Remove product
const removeProduct = async (req, res) => {
    await Product.findOneAndDelete({
        id: req.body.id
    });
    res.json({
        message: 'Xóa sản phẩm thành công'
    })
};

// [GET] all products
const getAllProducts = async (req, res) => {
    const allProducts = await Product.find({});
    res.json(allProducts);
}

// [GET] new collection
const getNewCollection = async (req, res) => {
    let products = await Product.find({});
    let newCollection = products.slice(-8);
    res.send(newCollection);
}

// [GET] Popular Products
const getPopularProducts = async (req, res) => {
    let products = await Product.find({platform: 'Windows'});
    let popularProducts = products.slice(-4);
    res.send(popularProducts);
}

module.exports = {
    addProduct,
    removeProduct,
    getAllProducts,
    getNewCollection,
    getPopularProducts
};