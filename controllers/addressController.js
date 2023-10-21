const Address = require('../models/Address');

const createAndUpdateAddress = async (req, res) => {
    const userEmail = req.user.userEmail;
    const address = await Address.findOne({ userEmail });
    if (address) {
        res.json(await Address.findByIdAndUpdate(address._id, req.body));
    } else {
        res.json(await Address.create({ userEmail, ...req.body }));
    }
};
const getAddress = async (req, res) => {
    const userEmail = req.user.userEmail;
    const address = await Address.findOne({ userEmail });
    res.status(200).json(address);
};

module.exports = { createAndUpdateAddress, getAddress };
