const mongoose = require('mongoose');


const CouponSchema = new mongoose.Schema(
    {
        code: { type: String, unique: true, required: true, uppercase: true, index: true },
        discountType: { type: String, enum: ['percentage', 'flat'], required: true },
        discountValue: { type: Number, required: true },
        minOrderValue: { type: Number, default: 0 },
        usageLimit: { type: Number, default: 0 }, // 0 means unlimited
        usedCount: { type: Number, default: 0 },
        validFrom: Date,
        validTo: Date,
        active: { type: Boolean, default: true },
    },
    { timestamps: true }
);


module.exports = mongoose.model('Coupon', CouponSchema);