const Product = require('../models/Product');

const getAllProducts = async (req, res) => {
    const products = await Product.find();
    res.status(200).json(products);
};

const getSingleProduct = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findOne({ _id: id });
    if (!product) {
        res.status(400).json({ msg: `No product with id ${id}` });
        return;
    }
    res.status(200).json(product);
};

const createProduct = async (req, res) => {
    const product = await Product.create(req.body);
    res.status(201).json(product);
};

const updateProduct = async (req, res) => {
    const {
        name,
        price,
        images,
        description,
        category,
        company,
        featured,
        _id,
    } = req.body;
    await Product.findOneAndUpdate(
        { _id },
        {
            name,
            price,
            images,
            description,
            category,
            company,
            featured,
        },
        {
            new: true,
            runValidators: true,
        }
    );
    res.status(200).json(true);
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    await Product.deleteOne({ _id: id });
    res.status(200).json(true);
};

module.exports = {
    getAllProducts,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct,
};
