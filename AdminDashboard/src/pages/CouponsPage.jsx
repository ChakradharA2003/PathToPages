// src/pages/CouponsPage.jsx
import React from "react";

const CouponsPage = () => {
  const coupons = [
    { code: "WELCOME10", discount: 10, expiry: "2025-12-31", used: 20 },
    { code: "FESTIVE20", discount: 20, expiry: "2025-11-15", used: 15 },
    { code: "SUMMER15", discount: 15, expiry: "2025-10-30", used: 5 },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Coupons Management</h2>

      <button className="mb-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
        Add Coupon
      </button>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Code</th>
              <th className="p-3">Discount (%)</th>
              <th className="p-3">Expiry</th>
              <th className="p-3">Used Count</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((c) => (
              <tr key={c.code} className="border-t">
                <td className="p-3 font-medium">{c.code}</td>
                <td className="p-3">{c.discount}%</td>
                <td className="p-3">{c.expiry}</td>
                <td className="p-3">{c.used}</td>
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

export default CouponsPage;
