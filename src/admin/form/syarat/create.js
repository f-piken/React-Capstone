import React, { useState } from "react";

const Create = ({ onSubmit, onClose, loading }) => {
  const [formData, setFormData] = useState({
    syarat: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white w-1/2 rounded-lg p-6 shadow-lg animate__animated animate__zoomIn">
        <h2 className="text-2xl font-semibold text-teal-700 mb-6 text-center">Tambah Artikel</h2>
        <form onSubmit={handleSubmit}>
          {/* Judul */}
          <div className="mb-6">
            <label htmlFor="syarat" className="block text-sm font-medium text-gray-700 mb-2">
              Syarat PMB
            </label>
            <input
              type="text"
              id="syarat"
              name="syarat"
              value={formData.syarat}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Masukkan syarat penghargaan"
              required
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-800 py-2 px-6 rounded-lg font-semibold hover:bg-gray-400 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-teal-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-teal-700 transition duration-200"
              disabled={loading}
            >
              {loading ? "Processing..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
