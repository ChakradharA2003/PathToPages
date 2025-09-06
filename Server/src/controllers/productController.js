const Product = require('../models/Product');
const asyncHandler = require('../middleware/asyncHandler');


exports.createProduct = asyncHandler(async (req, res) => {
    const payload = req.body;
    const product = await Product.create(payload);
    res.status(201).json({ success: true, data: product });
});


exports.updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ success: false, error: 'Product not found' });
    res.json({ success: true, data: product });
});


exports.deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ success: false, error: 'Product not found' });
    res.json({ success: true, data: 'Deleted' });
});


exports.getProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, error: 'Product not found' });
    res.json({ success: true, data: product });
});


exports.listProducts = asyncHandler(async (req, res) => {
    const { page = 1, limit = 20, q, type } = req.query;
    const match = { isActive: true };
    if (type) match.type = type;
    if (q) match.$text = { $search: q };
    const skip = (page - 1) * limit;
    const products = await Product.find(match).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit, 10));
    const total = await Product.countDocuments(match);
    res.json({ success: true, data: { products, meta: { total, page: parseInt(page, 10), limit: parseInt(limit, 10) } } });
});