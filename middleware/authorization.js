const jwt = require('jsonwebtoken');

const authenticateUser = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(403).json({ msg: 'Authentication invalid' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { userEmail: payload.userEmail };
        next();
    } catch (error) {
        res.status(403).json({ msg: 'Authentication invalid' });
    }
};

const getUserEmailFromRequest = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userEmail: payload.userEmail };
    next();
};

module.exports = { authenticateUser, getUserEmailFromRequest };
