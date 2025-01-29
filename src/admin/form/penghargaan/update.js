import React, { useState, useEffect } from "react";

const Update = ({ initialData, onSubmit, onClose, loading }) => {
  const [formData, setFormData] = useState({
    judul: "",
    kategori: "",
    content: "",
    gambar: null,
  });

  // Set initial data ketika komponen pertama kali dirender
  useEffect(() => {
    if (initialData) {
      setFormData({
        judul: initialData.judul || "",
        kategori: initialData.kategori || "",
        content: initialData.content || "",
        gambar: null, // Gambar tidak bisa langsung diset
      });
    }
  }, [initialData]);

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
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white w-1/2 rounded-lg p-6 shadow-lg animate__animated animate__zoomIn">
        <h2 className="text-2xl font-semibold text-teal-700 mb-6 text-center">Edit Penghargaan</h2>
        <form onSubmit={handleSubmit}>
          {/* Judul */}
          <div className="mb-6">
            <label htmlFor="judul" className="block text-sm font-medium text-gray-700 mb-2">
              Judul
            </label>
            <input
              type="text"
              id="judul"
              name="judul"
              value={formData.judul}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Masukkan judul penghargaan"
              required
            />
          </div>

          {/* Kategori */}
          <div className="mb-6">
            <label htmlFor="kategori" className="block text-sm font-medium text-gray-700 mb-2">
              Kategori
            </label>
            <input
              type="text"
              id="kategori"
              name="kategori"
              value={formData.kategori}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Masukkan kategori penghargaan"
              required
            />
          </div>

          {/* Content */}
          <div className="mb-6">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              rows="5"
              placeholder="Masukkan isi penghargaan"
              required
            />
          </div>

          {/* Gambar */}
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
              accept="image/*"
              required
            />
            {initialData.gambar && (
              <p className="text-sm text-gray-500 mt-2">Gambar saat ini: {initialData.gambar}</p>
            )}
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
              {loading ? "Processing..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update;
