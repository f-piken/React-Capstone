import React, { useState } from "react";

const Create = ({ onSubmit, onClose, loading }) => {
  const [formData, setFormData] = useState({
    kategori: "",
    link: "",
    judul: "",
    dekskripsi: "",
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
        <h2 className="text-2xl font-semibold text-teal-700 mb-6 text-center">Tambah Video</h2>
        <form onSubmit={handleSubmit}>
          {/* Kategori */}
          <div className="mb-6">
            <label htmlFor="kategori" className="block text-sm font-medium text-gray-700 mb-2">
              Kategori
            </label>
            <select
              id="kategori"
              name="kategori"
              value={formData.kategori}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            >
              <option value="" disabled>Pilih Kategori</option>
              <option value="tiktok">TikTok</option>
              <option value="youtube">YouTube</option>
            </select>
          </div>

          {/* Link */}
          <div className="mb-6">
            <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-2">
              Link
            </label>
            <input
              type="url"
              id="link"
              name="link"
              value={formData.link}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Masukkan link video"
              required
            />
          </div>

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
              placeholder="Masukkan judul video"
              required
            />
          </div>

          {/* Deskripsi */}
          <div className="mb-6">
            <label htmlFor="dekskripsi" className="block text-sm font-medium text-gray-700 mb-2">
              Deskripsi
            </label>
            <textarea
              id="dekskripsi"
              name="dekskripsi"
              value={formData.dekskripsi}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Masukkan deskripsi video"
              rows="4"
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
