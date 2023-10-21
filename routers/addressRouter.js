const express = require('express');
const router = express.Router();

const {
    createAndUpdateAddress,
    getAddress,
} = require('../controllers/addressController');

router.route('/').get(getAddress).put(createAndUpdateAddress);

module.exports = router;
