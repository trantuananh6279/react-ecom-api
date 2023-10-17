const User = require('../models/User');
const crypto = require('crypto');
const sendVerificationEmail = require('../utils/sendVerificationEmail');
const sendResetPasswordEmail = require('../utils/sendResetPasswordEmail');

const register = async (req, res) => {
    const { name, email, password } = req.body;
    const emailAlreadyExist = await User.findOne({ email });
    if (emailAlreadyExist) {
        res.status(400).json({ msg: 'Email already exist' });
        return;
    }
    const isFirstAccount = (await User.countDocuments()) === 0;
    const role = isFirstAccount ? 'admin' : 'user';
    const verificationToken = crypto.randomBytes(70).toString('hex');
    const origin = 'http://localhost:5173';
    const user = await User.create({
        name,
        email,
        password,
        role,
        verificationToken,
    });
    await sendVerificationEmail({
        name: user.name,
        email: user.email,
        verificationToken: user.verificationToken,
        origin,
    });
    res.status(201).json({
        msg: 'User registered',
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isPasswordCorrect = await user.comparePassword(password);
    if (!user || !isPasswordCorrect || !user.isVerified) {
        res.status(401).json({ msg: 'Invalid Credentials' });
        return;
    }
    const token = await user.createJWT();
    res.status(200).json({
        user: {
            name: user.name,
            email: user.email,
            token,
        },
    });
};

const verifyEmail = async (req, res) => {
    const { email, verificationToken } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.verificationToken !== verificationToken) {
        res.status(400).json({ msg: 'Verification failed' });
        return;
    }
    user.verificationToken = '';
    user.isVerified = true;
    user.verified = new Date();
    await user.save();
    res.status(200).json({ msg: 'Email verified' });
};

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        res.status(400).json({ msg: 'Email does not exist' });
        return;
    }
    const passwordToken = crypto.randomBytes(70).toString('hex');
    const origin = 'http://localhost:5173';
    const tenMinutes = 1000 * 60 * 10;
    user.passwordToken = passwordToken;
    user.passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);
    await user.save();
    await sendResetPasswordEmail({
        name: user.name,
        email: user.email,
        passwordToken: user.passwordToken,
        origin,
    });
    res.status(200).json({
        msg: 'Please check your email to reset password',
    });
};

const resetPassword = async (req, res) => {
    const { passwordToken, email, password } = req.body;
    if (!email || !passwordToken || !password) {
        res.status(400).json({ msg: 'Please provide all of values' });
    }
    const user = await User.findOne({ email });
    if (!user || user.passwordToken !== passwordToken) {
        res.status(400).json({ msg: 'Email does not exist' });
    }
    user.passwordToken = null;
    user.passwordTokenExpirationDate = null;
    user.password = password;
    await user.save();
    res.status(200).json({ msg: 'Success! Password reset' });
};

module.exports = {
    register,
    login,
    verifyEmail,
    forgotPassword,
    resetPassword,
};
