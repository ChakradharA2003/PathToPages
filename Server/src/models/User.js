const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true, index: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, default: false },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);


UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10);
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
});


UserSchema.methods.matchPassword = function (candidate) {
    return bcrypt.compare(candidate, this.password);
};


module.exports = mongoose.model('User', UserSchema);