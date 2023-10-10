require('dotenv').config();
const data = require('./MOCK_DATA.json');
const User = require('./models/User');
const mongooseConnect = require('./lib/mongodb');

const start = async () => {
    try {
        await mongooseConnect(process.env.MONGO_URL);
        await User.create(data);
        console.log(`OK`);
        process.exit(0);
    } catch (error) {
        console.log('Err');
        process.exit(1);
    }
};
start();
