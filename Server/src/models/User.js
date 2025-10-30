const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    fullAddress: { type: String, required: true },
    cart: { type: Object, default: {} },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
