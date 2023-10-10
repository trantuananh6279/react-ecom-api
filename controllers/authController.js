const User = require('../models/User');

const register = async (req, res) => {
    const { name, email, password } = req.body;
    const emailAlreadyExist = await User.findOne({ email });
    if (emailAlreadyExist) {
        res.status(400).json({ msg: 'Email already exist' });
        return;
    }
    await User.create({
        name,
        email,
        password,
    });
    res.status(201).json({
        msg: 'User registered',
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        res.status(401).json({ msg: 'Invalid Credentials' });
        return;
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
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

module.exports = { register, login };
