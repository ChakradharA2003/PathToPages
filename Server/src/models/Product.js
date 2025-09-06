const mongoose = require('mongoose');


const VariantSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: String,
    stock: { type: Number, default: 0 },
});


const ProductSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, index: true },
        description: { type: String },
        price: { type: Number, required: true },
        images: [String],
        type: { type: String, enum: ['scrapbook', 'bookmark'], required: true },
        variants: [VariantSchema],
        stock: { type: Number, default: 0 },
        tags: [String],
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);


ProductSchema.index({ name: 'text', description: 'text', tags: 'text' });


module.exports = mongoose.model('Product', ProductSchema);