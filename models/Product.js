const { Schema, default: mongoose } = require('mongoose');

const ProductSchema = new Schema(
    {
        name: { type: String },
        price: { type: Number },
        images: [{ type: String }],
        description: { type: String },
        category: {
            type: String,
            enum: ['office', 'kitchen', 'bedroom'],
        },
        company: { type: String, enum: ['ikea', 'liddy', 'marcos', 'caressa'] },
        featured: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);
