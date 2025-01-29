import React, { useState } from "react";

const Update = ({ onSubmit, onClose, initialData, loading }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    gambar: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, gambar: file }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 modal-overlay flex justify-center items-center z-50">
      <div className="modal-content animate__animated animate__zoomIn animate__faster">
        <h2 className="text-2xl font-semibold text-teal-700 mb-6 text-center">Update Carousel</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Update name Carousel"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="gambar" className="block text-sm font-medium text-gray-700 mb-2">
              Gambar
            </label>
            <input
              type="file"
              id="gambar"
              name="gambar"
              onChange={handleFileChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
            {initialData.gambar && (
              <p className="text-sm text-gray-500 mt-2">Gambar saat ini: {initialData.gambar}</p>
            )}
          </div>

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
              {loading ? "Updating..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update;
