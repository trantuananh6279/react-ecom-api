const Order = require('../models/Order');

const getAllOrders = async (req, res) => {
    await Order.find().sort('-createdAt');
};

const createOrder = async (req, res) => {};

module.exports = { getAllOrders, createOrder };
