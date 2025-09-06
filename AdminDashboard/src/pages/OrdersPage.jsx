// src/pages/OrdersPage.jsx
import React from "react";

const OrdersPage = () => {
  // static sample orders
  const orders = [
    {
      id: "ORD12345",
      customer: "John Doe",
      total: 999,
      status: "Processing",
      date: "2025-09-01",
    },
    {
      id: "ORD12346",
      customer: "Jane Smith",
      total: 1499,
      status: "Shipped",
      date: "2025-09-02",
    },
    {
      id: "ORD12347",
      customer: "David Johnson",
      total: 799,
      status: "Delivered",
      date: "2025-09-03",
    },
    {
      id: "ORD12348",
      customer: "Alice Brown",
      total: 1299,
      status: "Cancelled",
      date: "2025-09-04",
    },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case "Processing":
        return "bg-blue-100 text-blue-700";
      case "Shipped":
        return "bg-orange-100 text-orange-700";
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Orders Management</h2>

      {/* Filters */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <select className="border rounded p-2">
            <option value="">All Status</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search by Order ID or Customer"
            className="border rounded p-2 w-64"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Order ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Total (₹)</th>
              <th className="p-3">Status</th>
              <th className="p-3">Date</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="p-3 font-medium">{order.id}</td>
                <td className="p-3">{order.customer}</td>
                <td className="p-3">₹{order.total}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusClass(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="p-3">{order.date}</td>
                <td className="p-3">
                  <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md shadow">
                    View / Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersPage;


