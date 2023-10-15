const Product = require('../models/Product');

const getCartProducts = async (req, res) => {
    const ids = req.body.ids;
    const products = await Product.find({ _id: ids });
    res.status(200).json(products);
};

module.exports = { getCartProducts };
