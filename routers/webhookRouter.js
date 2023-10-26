const express = require('express');
const router = express.Router();

const updateOrder = require('../controllers/webhookController');

router.route('/').post(updateOrder);

module.exports = router;
