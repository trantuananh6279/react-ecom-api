const express = require('express');
const router = express.Router();

const { getCartProducts } = require('../controllers/cartController');

router.route('/').post(getCartProducts);

module.exports = router;
