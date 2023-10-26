const Order = require('../models/Order');

const getAllOrders = async (req, res) => {
    const orders = await Order.find().sort('-createdAt');
    res.status(200).json(orders);
};

module.exports = { getAllOrders };
