require('dotenv').config();
const Order = require('../models/Order');
const Product = require('../models/Product');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const checkout = async (req, res) => {
    const {
        name,
        email,
        city,
        postalCode,
        streetAddress,
        country,
        shippingFee,
        cartProducts,
    } = req.body;
    const productsIds = cartProducts;
    const uniqueIds = [...new Set(productsIds)];
    const productsInfos = await Product.find({ _id: uniqueIds });

    let line_items = [];
    for (const productId of uniqueIds) {
        const productInfo = productsInfos.find(
            (p) => p._id.toString() === productId
        );
        const quantity =
            productsIds.filter((id) => id === productId).length || 0;
        if (quantity > 0 && productInfo) {
            line_items.push({
                quantity,
                price_data: {
                    currency: 'USD',
                    product_data: { name: productInfo.name },
                    unit_amount: Math.ceil(productInfo.price),
                },
            });
        }
    }
    const order = await Order.create({
        line_items,
        name,
        email,
        city,
        postalCode,
        streetAddress,
        country,
        paid: false,
        userEmail: req.user.userEmail,
    });
    const stripeSession = await stripe.checkout.sessions.create({
        line_items,
        mode: 'payment',
        customer_email: email,
        success_url: `${process.env.PUBLIC_URL}/cart?success=true`,
        cancel_url: `${process.env.PUBLIC_URL}/cart?cancel=true`,
        metadata: { orderId: order._id.toString() },
        allow_promotion_codes: true,
        shipping_options: [
            {
                shipping_rate_data: {
                    display_name: 'Shipping fee',
                    type: 'fixed_amount',
                    fixed_amount: {
                        amount: shippingFee,
                        currency: 'USD',
                    },
                },
            },
        ],
    });
    res.json({
        url: stripeSession.url,
    });
};

module.exports = checkout;
