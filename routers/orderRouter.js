const express = require('express');
const router = express.Router();

const { getAllOrders, createOrder } = require('../controllers/orderController');

router.route('/').get(getAllOrders).post(createOrder);

module.exports = router;
