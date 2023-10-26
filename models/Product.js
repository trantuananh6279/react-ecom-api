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
        rating: {
            type: Number,
            default: 4.5,
        },
        stock: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

ProductSchema.virtual('wishedProduct', {
    ref: 'WishedProduct',
    localField: '_id',
    foreignField: 'product',
    justOne: false,
});

module.exports = mongoose.model('Product', ProductSchema);
