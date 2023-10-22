const WishedProduct = require('../models/WishedProduct');

const getWishedProducts = async (req, res) => {
    const { userEmail } = req.user;
    res.status(200).json(
        await WishedProduct.find({ userEmail }).populate('product')
    );
};

const createAndUpdateWishedProduct = async (req, res) => {
    const { productId } = req.body;
    const { userEmail } = req.user;
    const wishedProduct = await WishedProduct.findOne({
        userEmail,
        product: productId,
    });
    if (wishedProduct) {
        await WishedProduct.findByIdAndDelete(wishedProduct._id);
        res.status(200).json({ wishedProduct });
    } else {
        await WishedProduct.create({ userEmail, product: productId });
        res.status(201).json('create');
    }
};

module.exports = { getWishedProducts, createAndUpdateWishedProduct };
