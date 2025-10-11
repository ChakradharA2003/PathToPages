// src/pages/ProductsPage.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE = "http://localhost:4000/api/v1/products"; // adjust for your backend

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "scrapbook",
    price: "",
    stock: "",
    images: [], // This will contain both existing images (URLs) and new previews
    files: [], // This will only contain new files to upload
    existingImages: [], // This will contain existing image URLs from the database
  });

  // Filters
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [priceRange, setPriceRange] = useState(1000);
  const [stockRange, setStockRange] = useState(500);

  // Image modal
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Delete confirmation modal
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // -------------------------------
  // Backend Integration
  // -------------------------------
  const fetchProducts = async () => {
    try {
      const query = new URLSearchParams();
      if (search) query.append("q", search);
      if (categoryFilter !== "all") query.append("category", categoryFilter);
      if (priceRange) query.append("maxPrice", priceRange);
      if (stockRange) query.append("maxStock", stockRange);

      const res = await fetch(`${API_BASE}?${query.toString()}`);
      const data = await res.json();
      if (data.success) {
        setProducts(data.data.products);
      } else {
        console.error("❌ API Error:", data.error || "Failed to fetch products");
        alert("Failed to fetch products: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error("❌ Error fetching products:", err);
      alert("Network error: " + err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search, categoryFilter, priceRange, stockRange]);

  // Helper function to get full image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) {
      return imagePath; // Already a full URL
    }
    return `http://localhost:4000${imagePath}`; // Add server base URL
  };

  // Reset form
  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      category: "scrapbook",
      price: "",
      stock: "",
      images: [],
      files: [],
      existingImages: [],
    });
    setIsEdit(false);
    setEditId(null);
  };

  // Submit (add or edit)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("category", form.category);
      formData.append("price", Number(form.price));
      formData.append("stock", Number(form.stock));

      // For edit mode, include existing images
      if (isEdit && form.existingImages.length > 0) {
        formData.append("existingImages", JSON.stringify(form.existingImages));
      }

      // append uploaded files
      form.files.forEach((file) => {
        formData.append("images", file);
      });

      const url = isEdit ? `${API_BASE}/${editId}` : API_BASE;
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        fetchProducts();
        alert(isEdit ? "Product updated successfully!" : "Product created successfully!");
        resetForm();
        setShowModal(false);
      } else {
        console.error("❌ API Error:", data.error || "Failed to save product");
        alert("Failed to save product: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error("❌ Error saving product:", err);
      alert("Network error: " + err.message);
    }
  };

  // Edit
  const handleEdit = (product) => {
    setForm({
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      stock: product.stock,
      images: product.images || [], // Existing images from database
      files: [], // New files to upload
      existingImages: product.images || [], // Keep track of existing images
    });
    setEditId(product._id);
    setIsEdit(true);
    setShowModal(true);
  };

  // Delete
  const confirmDelete = (id) => {
    setDeleteId(id);
    setDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`${API_BASE}/${deleteId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        fetchProducts();
        alert("Product deleted successfully!");
        setDeleteId(null);
        setDeleteModal(false);
      } else {
        console.error("❌ API Error:", data.error || "Failed to delete product");
        alert("Failed to delete product: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error("❌ Error deleting product:", err);
      alert("Network error: " + err.message);
    }
  };

  // Remove image locally (before submit)
  const removeImage = (index, isExisting = false) => {
    if (isExisting) {
      // Remove from existing images
      const updatedExistingImages = [...form.existingImages];
      updatedExistingImages.splice(index, 1);
      setForm({ 
        ...form, 
        existingImages: updatedExistingImages,
        images: [...updatedExistingImages, ...form.images.filter((_, i) => i >= form.existingImages.length)]
      });
    } else {
      // Remove from new images
      const newImageIndex = index - form.existingImages.length;
      const updatedImages = [...form.images];
      updatedImages.splice(index, 1);

      const updatedFiles = [...form.files];
      updatedFiles.splice(newImageIndex, 1);

      setForm({ ...form, images: updatedImages, files: updatedFiles });
    }
  };

  // Open image modal at a specific index
  const openImageModal = (images, startIndex = 0) => {
    setSelectedImages(images);
    setCurrentImageIndex(startIndex);
    setShowImageModal(true);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Products Management</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name"
          className="p-2 border rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="p-2 border rounded"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="scrapbook">Scrapbook</option>
          <option value="bookmark">Bookmark</option>
        </select>
        <select
          className="p-2 border rounded"
          value={stockFilter}
          onChange={(e) => setStockFilter(e.target.value)}
        >
          <option value="all">All Stock</option>
          <option value="in">In Stock</option>
          <option value="out">Out of Stock</option>
        </select>
      </div>

      {/* Sliders */}
      <div className="flex flex-wrap gap-8 mb-6">
        <div className="flex flex-col w-48">
          <label className="font-medium mb-1">Max Price: ₹{priceRange}</label>
          <input
            type="range"
            min="0"
            max="2000"
            step="50"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
          />
        </div>
        <div className="flex flex-col w-48">
          <label className="font-medium mb-1">Max Stock: {stockRange}</label>
          <input
            type="range"
            min="0"
            max="1000"
            step="10"
            value={stockRange}
            onChange={(e) => setStockRange(Number(e.target.value))}
          />
        </div>
      </div>

      {/* Add Product */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          resetForm();
          setShowModal(true);
        }}
        className="mb-4 px-5 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-lg shadow"
      >
        + Add Product
      </motion.button>

      {/* Products Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        {products.length > 0 ? (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3">Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Price (₹)</th>
                <th className="p-3">Stock</th>
                <th className="p-3">Images</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((prod) => (
                <motion.tr
                  key={prod._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-3 font-medium">{prod.name}</td>
                  <td className="p-3 capitalize">{prod.category}</td>
                  <td className="p-3">₹{prod.price}</td>
                  <td
                    className={`p-3 ${
                      prod.stock > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {prod.stock}
                  </td>
                  <td className="p-3">
                    {prod.images?.length > 0 ? (
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          {prod.images.slice(0, 3).map((img, idx) => (
                            <img
                              key={idx}
                              src={getImageUrl(img)}
                              alt={prod.name}
                              className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm cursor-pointer hover:scale-110 transition-transform"
                              onClick={() => openImageModal(prod.images.map(getImageUrl), idx)}
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          ))}
                        </div>
                        {prod.images.length > 3 && (
                          <span 
                            className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full cursor-pointer hover:bg-gray-300"
                            onClick={() => openImageModal(prod.images.map(getImageUrl), 0)}
                          >
                            +{prod.images.length - 3} more
                          </span>
                        )}
                        <span className="text-xs text-gray-500">
                          ({prod.images.length} {prod.images.length === 1 ? 'image' : 'images'})
                        </span>
                      </div>
                    ) : (
                      <span className="text-gray-400 text-sm">No Images</span>
                    )}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleEdit(prod)}
                      className="mr-2 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => confirmDelete(prod._id)}
                      className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md"
                    >
                      Delete
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-6 rounded-2xl shadow-lg text-center max-w-md">
              <h3 className="text-xl font-semibold mb-2">No Products Found</h3>
              <p className="text-white/90">
                Try adjusting your filters or add a new product to get started.
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white w-full max-w-4xl rounded-lg shadow-lg p-6 overflow-y-auto max-h-[90vh]"
            >
              <h3 className="text-xl font-semibold mb-4">
                {isEdit ? "Edit Product" : "Add New Product"}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Product Name"
                  className="w-full p-2 border rounded"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
                <textarea
                  placeholder="Description"
                  className="w-full p-2 border rounded"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
                <div className="flex gap-4">
                  <input
                    type="number"
                    placeholder="Price"
                    className="w-1/2 p-2 border rounded"
                    value={form.price}
                    onChange={(e) =>
                      setForm({ ...form, price: e.target.value })
                    }
                    required
                  />
                  <input
                    type="number"
                    placeholder="Stock"
                    className="w-1/2 p-2 border rounded"
                    value={form.stock}
                    onChange={(e) =>
                      setForm({ ...form, stock: e.target.value })
                    }
                    required
                  />
                </div>

                {/* Image Upload Section */}
                <div>
                  <label className="block font-medium mb-2">
                    {isEdit ? "Product Images" : "Upload Images"}
                  </label>
                  
                  {/* Show existing images if editing */}
                  {isEdit && form.existingImages.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Current Images:</h4>
                      <div className="flex gap-2 flex-wrap">
                        {form.existingImages.map((img, idx) => (
                          <div
                            key={`existing-${idx}`}
                            className="relative w-20 h-20 border rounded overflow-hidden group"
                          >
                            <img
                              src={getImageUrl(img)}
                              alt="existing"
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                              onClick={() => openImageModal(form.existingImages.map(getImageUrl), idx)}
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(idx, true)}
                              className="absolute top-0 right-0 bg-red-600 text-white text-xs px-1 rounded-bl opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              ✕
                            </button>
                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 text-center">
                              Existing
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* File input for new images */}
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="w-full p-2 border rounded mb-2"
                    onChange={(e) => {
                      const files = Array.from(e.target.files);
                      const previews = files.map((file) =>
                        URL.createObjectURL(file)
                      );
                      setForm({
                        ...form,
                        images: [...form.images, ...previews],
                        files: [...form.files, ...files],
                      });
                    }}
                  />

                  {/* Show new image previews */}
                  {form.images.length > form.existingImages.length && (
                    <div className="mt-3">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">New Images:</h4>
                      <div className="flex gap-2 flex-wrap">
                        {form.images.slice(form.existingImages.length).map((img, idx) => (
                          <div
                            key={`new-${idx}`}
                            className="relative w-20 h-20 border rounded overflow-hidden group"
                          >
                            <img
                              src={img}
                              alt="preview"
                              className="w-full h-full object-cover"
                              onClick={() => openImageModal([
                                ...form.existingImages.map(getImageUrl),
                                ...form.images.slice(form.existingImages.length)
                              ], form.existingImages.length + idx)}
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(form.existingImages.length + idx)}
                              className="absolute top-0 right-0 bg-red-600 text-white text-xs px-1 rounded-bl opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              ✕
                            </button>
                            <div className="absolute bottom-0 left-0 right-0 bg-green-600 bg-opacity-75 text-white text-xs p-1 text-center">
                              New
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Total images count */}
                  {form.images.length > 0 && (
                    <div className="mt-2 text-sm text-gray-600">
                      Total images: {form.images.length} 
                      {form.existingImages.length > 0 && (
                        <span> ({form.existingImages.length} existing, {form.images.length - form.existingImages.length} new)</span>
                      )}
                    </div>
                  )}
                </div>

                <select
                  className="w-full p-2 border rounded"
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                >
                  <option value="scrapbook">Scrapbook</option>
                  <option value="bookmark">Bookmark</option>
                </select>
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow"
                  >
                    {isEdit ? "Update Product" : "Save Product"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Modal */}
      <AnimatePresence>
        {showImageModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-lg shadow-lg p-4 relative max-w-4xl w-full"
            >
              <img
                src={selectedImages[currentImageIndex]}
                alt="Product"
                className="w-full h-96 object-contain rounded"
              />
              <button
                className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => setShowImageModal(false)}
              >
                X
              </button>
              <div className="flex justify-between items-center mt-4">
                <button
                  disabled={currentImageIndex === 0}
                  className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                  onClick={() => setCurrentImageIndex((i) => i - 1)}
                >
                  Prev
                </button>
                <span className="text-sm text-gray-600">
                  {currentImageIndex + 1} of {selectedImages.length}
                </span>
                <button
                  disabled={currentImageIndex === selectedImages.length - 1}
                  className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                  onClick={() => setCurrentImageIndex((i) => i + 1)}
                >
                  Next
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
      <AnimatePresence>
        {deleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 shadow-lg max-w-sm w-full text-center"
            >
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Confirm Delete
              </h3>
              <p className="text-gray-600 mb-5">
                Are you sure you want to delete this product? This action cannot
                be undone.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setDeleteModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 shadow"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductsPage;
