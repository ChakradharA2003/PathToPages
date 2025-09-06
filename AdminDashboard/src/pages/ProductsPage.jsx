// src/pages/ProductsPage.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ProductsPage = () => {
  const [products, setProducts] = useState([
    {
      id: "P001",
      name: "Travel Scrapbook",
      description: "A memory-keeper for your travels.",
      category: "scrapbook",
      price: 499,
      stock: 100,
      images: [
        "https://via.placeholder.com/150/0000FF",
        "https://via.placeholder.com/150/FF0000",
      ],
    },
    {
      id: "P002",
      name: "Bookmark A",
      description: "Simple bookmark design.",
      category: "bookmark",
      price: 99,
      stock: 50,
      images: ["https://via.placeholder.com/150"],
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "scrapbook",
    price: "",
    stock: "",
    images: "",
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

  // Reset form
  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      category: "scrapbook",
      price: "",
      stock: "",
      images: "",
    });
    setIsEdit(false);
    setEditId(null);
  };

  // Handle submit (add or edit)
  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedProduct = {
      id: isEdit ? editId : `P${Math.floor(Math.random() * 1000)}`,
      name: form.name,
      description: form.description,
      category: form.category,
      price: Number(form.price),
      stock: Number(form.stock),
      images: form.images.split(",").map((i) => i.trim()),
    };

    if (isEdit) {
      setProducts((prev) =>
        prev.map((p) => (p.id === editId ? formattedProduct : p))
      );
    } else {
      setProducts([...products, formattedProduct]);
    }

    resetForm();
    setShowModal(false);
  };

  // Edit product
  const handleEdit = (product) => {
    setForm({
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      stock: product.stock,
      images: product.images.join(", "),
    });
    setEditId(product.id);
    setIsEdit(true);
    setShowModal(true);
  };

  // Confirm delete (opens modal)
  const confirmDelete = (id) => {
    setDeleteId(id);
    setDeleteModal(true);
  };

  // Actually delete
  const handleDelete = () => {
    setProducts(products.filter((p) => p.id !== deleteId));
    setDeleteId(null);
    setDeleteModal(false);
  };

  // Open image modal
  const openImageModal = (images) => {
    setSelectedImages(images);
    setCurrentImageIndex(0);
    setShowImageModal(true);
  };

  // Apply filters
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name
      .toLowerCase()
      .includes(search.toLowerCase().trim());

    const matchesCategory =
      categoryFilter === "all" ? true : p.category === categoryFilter;

    const matchesStock =
      stockFilter === "all"
        ? true
        : stockFilter === "in"
        ? p.stock > 0
        : p.stock === 0;

    const matchesPrice = p.price <= priceRange;
    const matchesStockRange = p.stock <= stockRange;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesStock &&
      matchesPrice &&
      matchesStockRange
    );
  });

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

      {/* Add Product Button */}
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

      {/* Products Table / Empty State */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        {filteredProducts.length > 0 ? (
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
              {filteredProducts.map((prod) => (
                <motion.tr
                  key={prod.id}
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
                    {prod.images.length > 0 ? (
                      <img
                        src={prod.images[0]}
                        alt={prod.name}
                        className="w-12 h-12 rounded object-cover cursor-pointer"
                        onClick={() => openImageModal(prod.images)}
                      />
                    ) : (
                      "No Image"
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
                      onClick={() => confirmDelete(prod.id)}
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-14 w-14 mx-auto mb-4 text-white/90"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 13h6m-3-3v6m-9 1.5A2.25 2.25 0 015.25 15H18.75A2.25 2.25 0 0121 17.25v1.5A2.25 2.25 0 0118.75 21H5.25A2.25 2.25 0 013 18.75v-1.5z"
                />
              </svg>
              <h3 className="text-xl font-semibold mb-2">No Products Found</h3>
              <p className="text-white/90">
                Try adjusting your filters or add a new product to get started.
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
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

      {/* Add/Edit Product Modal */}
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
              className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6 overflow-y-auto max-h-[90vh]"
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
                <input
                  type="text"
                  placeholder="Image URLs (comma separated)"
                  className="w-full p-2 border rounded"
                  value={form.images}
                  onChange={(e) =>
                    setForm({ ...form, images: e.target.value })
                  }
                />
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
              className="bg-white rounded-lg shadow-lg p-4 relative max-w-2xl w-full"
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
              <div className="flex justify-between mt-4">
                <button
                  disabled={currentImageIndex === 0}
                  className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                  onClick={() => setCurrentImageIndex((i) => i - 1)}
                >
                  Prev
                </button>
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
    </div>
  );
};

export default ProductsPage;
