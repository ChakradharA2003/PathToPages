// src/pages/CouponsPage.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CouponsPage = () => {
  const [coupons, setCoupons] = useState([
    { code: "WELCOME10", discountType: "percentage", discountValue: 10, minOrderValue: 0, usageLimit: 0, usedCount: 20, validFrom: "2025-01-01", validTo: "2025-12-31", active: true, applicableCategories: ["scrapbook"] },
    { code: "FESTIVE20", discountType: "percentage", discountValue: 20, minOrderValue: 500, usageLimit: 50, usedCount: 15, validFrom: "2025-08-01", validTo: "2025-11-15", active: true, applicableCategories: ["bookmark"] },
    { code: "SUMMER15", discountType: "flat", discountValue: 150, minOrderValue: 200, usageLimit: 10, usedCount: 5, validFrom: "2025-06-01", validTo: "2025-10-30", active: true, applicableCategories: ["scrapbook","bookmark"] },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editCode, setEditCode] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteCode, setDeleteCode] = useState(null);

  const [form, setForm] = useState({
    code: "",
    discountType: "percentage",
    discountValue: "",
    minOrderValue: 0,
    usageLimit: 0,
    validFrom: "",
    validTo: "",
    active: true,
    applicableCategories: [],
  });

  const [searchCode, setSearchCode] = useState("");
  const [discountRange, setDiscountRange] = useState(100);
  const [usedRange, setUsedRange] = useState(100);
  const [dateFilter, setDateFilter] = useState("");

  const resetForm = () => {
    setForm({
      code: "",
      discountType: "percentage",
      discountValue: "",
      minOrderValue: 0,
      usageLimit: 0,
      validFrom: "",
      validTo: "",
      active: true,
      applicableCategories: [],
    });
    setIsEdit(false);
    setEditCode(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedCoupon = {
      ...form,
      code: form.code.toUpperCase(),
      discountValue: Number(form.discountValue),
      minOrderValue: Number(form.minOrderValue),
      usageLimit: Number(form.usageLimit),
      usedCount: isEdit ? coupons.find(c => c.code === editCode).usedCount : 0,
    };

    if (isEdit) {
      setCoupons(prev => prev.map(c => c.code === editCode ? formattedCoupon : c));
    } else {
      setCoupons([...coupons, formattedCoupon]);
    }

    resetForm();
    setShowModal(false);
  };

  const handleEdit = (c) => {
    setForm({ ...c });
    setEditCode(c.code);
    setIsEdit(true);
    setShowModal(true);
  };

  const confirmDelete = (code) => {
    setDeleteCode(code);
    setDeleteModal(true);
  };

  const handleDelete = () => {
    setCoupons(coupons.filter(c => c.code !== deleteCode));
    setDeleteModal(false);
    setDeleteCode(null);
  };

  const filteredCoupons = coupons.filter(c => {
    const matchesCode = c.code.toLowerCase().includes(searchCode.toLowerCase());
    const matchesDiscount = c.discountValue <= discountRange;
    const matchesUsed = c.usedCount <= usedRange;
    const matchesDate = dateFilter ? new Date(c.validTo) >= new Date(dateFilter) : true;
    return matchesCode && matchesDiscount && matchesUsed && matchesDate;
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Coupons Management</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input type="text" placeholder="Search by code" className="p-2 border rounded" value={searchCode} onChange={(e) => setSearchCode(e.target.value)} />
        <div className="flex flex-col w-48">
          <label className="font-medium mb-1">Max Discount: {discountRange}%</label>
          <input type="range" min="0" max="100" value={discountRange} onChange={(e) => setDiscountRange(Number(e.target.value))} />
        </div>
        <div className="flex flex-col w-48">
          <label className="font-medium mb-1">Max Used Count: {usedRange}</label>
          <input type="range" min="0" max="100" value={usedRange} onChange={(e) => setUsedRange(Number(e.target.value))} />
        </div>
        <input type="date" className="p-2 border rounded" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} />
      </div>

      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => { resetForm(); setShowModal(true); }} className="mb-4 px-5 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-lg shadow">
        + Add Coupon
      </motion.button>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        {filteredCoupons.length ? (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3">Code</th>
                <th className="p-3">Discount</th>
                <th className="p-3">Min Order</th>
                <th className="p-3">Expiry</th>
                <th className="p-3">Used</th>
                <th className="p-3">Active</th>
                <th className="p-3">Categories</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCoupons.map(c => (
                <motion.tr key={c.code} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="border-t hover:bg-gray-50">
                  <td className="p-3 font-medium">{c.code}</td>
                  <td className="p-3">{c.discountType === "percentage" ? `${c.discountValue}%` : `₹${c.discountValue}`}</td>
                  <td className="p-3">₹{c.minOrderValue}</td>
                  <td className="p-3">{c.validTo}</td>
                  <td className="p-3">{c.usedCount}</td>
                  <td className="p-3">{c.active ? "Yes" : "No"}</td>
                  <td className="p-3">{c.applicableCategories.join(", ")}</td>
                  <td className="p-3">
                    <button onClick={() => handleEdit(c)} className="mr-2 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md">Edit</button>
                    <button onClick={() => confirmDelete(c.code)} className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md">Delete</button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-20">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-6 rounded-2xl shadow-lg text-center max-w-md">
              <h3 className="text-xl font-semibold mb-2">No Coupons Found</h3>
              <p className="text-white/90">Adjust your filters or add a new coupon to get started.</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Delete Modal */}
      <AnimatePresence>
        {deleteModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-white rounded-xl p-6 shadow-lg max-w-sm w-full text-center">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Confirm Delete</h3>
              <p className="text-gray-600 mb-5">Are you sure you want to delete this coupon?</p>
              <div className="flex justify-center gap-4">
                <button onClick={() => setDeleteModal(false)} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Cancel</button>
                <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 shadow">Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} transition={{ duration: 0.3 }} className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6 overflow-y-auto max-h-[90vh]">
              <h3 className="text-xl font-semibold mb-4">{isEdit ? "Edit Coupon" : "Add New Coupon"}</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-medium mb-1">Coupon Code</label>
                  <input type="text" placeholder="Code" className="w-full p-2 border rounded" value={form.code} onChange={e => setForm({...form, code: e.target.value})} required />
                </div>

                <div className="flex gap-4">
                  <div className="w-1/2">
                    <label className="block font-medium mb-1">Discount Type</label>
                    <select className="w-full p-2 border rounded" value={form.discountType} onChange={e => setForm({...form, discountType: e.target.value})}>
                      <option value="percentage">Percentage</option>
                      <option value="flat">Flat</option>
                    </select>
                  </div>
                  <div className="w-1/2">
                    <label className="block font-medium mb-1">Discount Value</label>
                    <input type="number" className="w-full p-2 border rounded" value={form.discountValue} onChange={e => setForm({...form, discountValue: e.target.value})} required />
                  </div>
                </div>

                <div>
                  <label className="block font-medium mb-1">Min Order Value</label>
                  <input type="number" className="w-full p-2 border rounded" value={form.minOrderValue} onChange={e => setForm({...form, minOrderValue: e.target.value})} />
                </div>

                <div>
                  <label className="block font-medium mb-1">Usage Limit</label>
                  <input type="number" className="w-full p-2 border rounded" value={form.usageLimit} onChange={e => setForm({...form, usageLimit: e.target.value})} />
                </div>

                <div className="flex gap-4">
                  <div className="w-1/2">
                    <label className="block font-medium mb-1">Valid From</label>
                    <input type="date" className="w-full p-2 border rounded" value={form.validFrom} onChange={e => setForm({...form, validFrom: e.target.value})} />
                  </div>
                  <div className="w-1/2">
                    <label className="block font-medium mb-1">Valid To</label>
                    <input type="date" className="w-full p-2 border rounded" value={form.validTo} onChange={e => setForm({...form, validTo: e.target.value})} />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={form.active} onChange={e => setForm({...form, active: e.target.checked})} />
                    Active
                  </label>
                </div>

                <div>
                  <label className="block font-medium mb-1">Applicable Categories</label>
                  <select multiple className="w-full p-2 border rounded" value={form.applicableCategories} onChange={e => setForm({...form, applicableCategories: Array.from(e.target.selectedOptions, option => option.value)})}>
                    <option value="scrapbook">Scrapbook</option>
                    <option value="bookmark">Bookmark</option>
                  </select>
                </div>

                <div className="flex justify-end gap-3">
                  <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
                  <button type="submit" className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow">{isEdit ? "Update Coupon" : "Save Coupon"}</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CouponsPage;
