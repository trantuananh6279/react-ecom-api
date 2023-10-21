const { Schema, default: mongoose } = require('mongoose');

const AddressSchema = new Schema(
    {
        userEmail: { type: String, unique: true, required: true },
        name: String,
        email: String,
        city: String,
        postalCode: String,
        streetAddress: String,
        country: String,
    },
    { timestamps: true }
);

module.exports = mongoose.model('Address', AddressSchema);
