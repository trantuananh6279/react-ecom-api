const express = require('express');
const router = express.Router();

const {
    register,
    login,
    verifyEmail,
    forgotPassword,
    resetPassword,
} = require('../controllers/authController');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/verify-email').post(verifyEmail);
router.route('/forgot-password').post(forgotPassword);
router.route('/reset-password').post(resetPassword);

module.exports = router;
