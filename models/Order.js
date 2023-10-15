const { Schema, default: mongoose } = require('mongoose');

const OrderSchema = new Schema(
    {
        cartItem: Object,
        name: String,
        email: String,
        city: String,
        postalCode: String,
        streetAddress: String,
        country: String,
        paid: Boolean,
    },
    { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);
