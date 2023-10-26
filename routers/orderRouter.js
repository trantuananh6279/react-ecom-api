const express = require('express');
const router = express.Router();

const { getAllOrders } = require('../controllers/orderController');

router.route('/').get(getAllOrders);

module.exports = router;
