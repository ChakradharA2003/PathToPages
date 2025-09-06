const mongoose = require('mongoose');


const OrderItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    variantId: { type: mongoose.Schema.Types.ObjectId },
    name: String,
    quantity: Number,
    price: Number,
});


const OrderSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        items: [OrderItemSchema],
        shippingAddress: { type: Object, required: true },
        totalAmount: { type: Number, required: true },
        coupon: { type: mongoose.Schema.Types.ObjectId, ref: 'Coupon' },
        paymentMethod: { type: String, default: 'razorpay' },
        paymentStatus: { type: String, enum: ['pending', 'paid', 'failed', 'refunded'], default: 'pending' },
        orderStatus: { type: String, enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
        razorpayOrderId: String,
        razorpayPaymentId: String,
        razorpaySignature: String,
    },
    { timestamps: true }
);


module.exports = mongoose.model('Order', OrderSchema);