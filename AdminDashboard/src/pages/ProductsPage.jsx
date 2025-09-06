// src/pages/ProductsPage.jsx
import React from "react";

const ProductsPage = () => {
  const products = [
    {
      id: "P001",
      name: "Travel Scrapbook",
      category: "Scrapbook",
      price: 499,
      stock: 100,
      variants: [],
    },
    {
      id: "P002",
      name: "Bookmark A",
      category: "Bookmark",
      price: 99,
      stock: 50,
      variants: ["Type 1", "Type 2"],
    },
    {
      id: "P003",
      name: "Bookmark B",
      category: "Bookmark",
      price: 149,
      stock: 30,
      variants: ["Type 1", "Type 2", "Type 3"],
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Products Management</h2>

      <button className="mb-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
        Add Product
      </button>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price (₹)</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Variants</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod.id} className="border-t">
                <td className="p-3 font-medium">{prod.name}</td>
                <td className="p-3">{prod.category}</td>
                <td className="p-3">₹{prod.price}</td>
                <td className={`p-3 ${prod.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>{prod.stock}</td>
                <td className="p-3">{prod.variants.join(", ")}</td>
                <td className="p-3">
                  <button className="mr-2 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md">Edit</button>
                  <button className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsPage;


