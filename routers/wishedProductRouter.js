const express = require('express');
const router = express.Router();

const {
    getWishedProducts,
    createAndUpdateWishedProduct,
} = require('../controllers/wishedProductController');

router.route('/').get(getWishedProducts).post(createAndUpdateWishedProduct);

module.exports = router;
