require('dotenv').config();

const express = require('express');
const app = express();

// lib
const cors = require('cors');
const mongooseConnect = require('./lib/mongodb');

// router
const authRouter = require('./routers/authRouter');
const productRouter = require('./routers/productRouter');
const uploadRouter = require('./routers/uploadRouter');
const cartRouter = require('./routers/cartRouter');
// const orderRouter = require('./routers/orderRouter')

app.use(cors());
app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/upload', uploadRouter);
app.use('/api/v1/carts', cartRouter);
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
