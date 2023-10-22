require('dotenv').config();

const express = require('express');
const app = express();

// lib
const cors = require('cors');
const mongooseConnect = require('./lib/mongodb');

// middleware
const authenticateUser = require('./middleware/authorization');

// router
const authRouter = require('./routers/authRouter');
const productRouter = require('./routers/productRouter');
const uploadRouter = require('./routers/uploadRouter');
const cartRouter = require('./routers/cartRouter');
const checkoutRouter = require('./routers/checkoutRouter');
const addressRouter = require('./routers/addressRouter');
const webhookRouter = require('./routers/webhookRouter');
const wishedProductRouter = require('./routers/wishedProductRouter');
// const orderRouter = require('./routers/orderRouter')

app.use('/webhook', webhookRouter);
app.use(cors());
// app.use((req, res, next) => {
//     if (req.originalUrl !== '/webhook') {
//         express.json()(req, res, next);
//         return;
//     }
//     next();
// });
app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/upload', uploadRouter);
app.use('/api/v1/carts', cartRouter);
app.use('/api/v1/checkout', authenticateUser, checkoutRouter);
app.use('/api/v1/address', authenticateUser, addressRouter);
app.use('/api/v1/wish-list', authenticateUser, wishedProductRouter);
// app.use('/webhook', webhookRouter);
// app.use('/api/v1/orders', orderRouter);

const port = process.env.PORT || 3000;
const start = async () => {
    try {
        await mongooseConnect(process.env.MONGO_URL);
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`);
        });
    } catch (error) {
        console.log(error);
    }
};
start();
