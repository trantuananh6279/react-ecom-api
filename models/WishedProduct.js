const { Schema, default: mongoose } = require('mongoose');
const Product = require('./Product');

const WishedProductSchema = new Schema(
    {
        userEmail: { type: String, required: true },
        product: { type: Schema.Types.ObjectId, ref: Product },
    },
    { timestamps: true }
);

module.exports = mongoose.model('WishedProduct', WishedProductSchema);
