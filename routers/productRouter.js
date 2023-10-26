const express = require('express');
const router = express.Router();

const {
    getAllProducts,
    getSingleProduct,
    getFeaturedProducts,
    getMaxPrice,
    createProduct,
    updateProduct,
    deleteProduct,
} = require('../controllers/productController');

router.route('/').get(getAllProducts).post(createProduct);
router.route('/featured').get(getFeaturedProducts);
router.route('/max-price').get(getMaxPrice);
router
    .route('/:id')
    .get(getSingleProduct)
    .patch(updateProduct)
    .delete(deleteProduct);

module.exports = router;
