const mongoose = require('mongoose');


const CartItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    variantId: { type: mongoose.Schema.Types.ObjectId },
    name: String,
    price: Number,
    quantity: { type: Number, default: 1 },
});


const CartSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
        items: [CartItemSchema],
        coupon: { type: mongoose.Schema.Types.ObjectId, ref: 'Coupon' },
        total: { type: Number, default: 0 },
    },
    { timestamps: true }
);


module.exports = mongoose.model('Cart', CartSchema);