const Product = require('../models/Product');

const getAllProducts = async (req, res) => {
    const { search, category, company, price, sort } = req.query;
    const queryObject = {};
    if (search) {
        queryObject.name = { $regex: search, $options: 'i' };
    }
    if (category && category !== 'all') {
        queryObject.category = category;
    }
    if (company && company !== 'all') {
        queryObject.company = company;
    }
    if (price) {
        queryObject.price = { $lte: price };
    }

    let results = Product.find(queryObject);
    if (sort === 'price-lowest') {
        results = results.sort('price');
    }
    if (sort === 'price-highest') {
        results = results.sort('-price');
    }
    if (sort === 'name-a') {
        results = results.sort('name');
    }
    if (sort === 'name-z') {
        results = results.sort('-name');
    }

    const products = await results;
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
        stock,
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
            stock,
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
