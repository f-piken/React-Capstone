import React, { useState } from "react";

const Create = ({ onSubmit, onClose, loading }) => {
  const [formData, setFormData] = useState({
    pertemuan: "",
    tanggal: "",
    waktu_mulai: "",
    waktu_selesai: "",
    keterangan: "",
    lokasi: "",
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
        <h2 className="text-2xl font-semibold text-teal-700 mb-6 text-center">Tambah Jadwal</h2>
        <form onSubmit={handleSubmit}>
          {/* Pertemuan */}
          <div className="mb-6">
            <label htmlFor="pertemuan" className="block text-sm font-medium text-gray-700 mb-2">
              Pertemuan
            </label>
            <input
              type="text"
              id="pertemuan"
              name="pertemuan"
              value={formData.pertemuan}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Masukkan pertemuan"
              required
            />
          </div>

          {/* Tanggal */}
          <div className="mb-6">
            <label htmlFor="tanggal" className="block text-sm font-medium text-gray-700 mb-2">
              Tanggal
            </label>
            <input
              type="date"
              id="tanggal"
              name="tanggal"
              value={formData.tanggal}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          {/* Waktu Mulai */}
          <div className="mb-6">
            <label htmlFor="waktu_mulai" className="block text-sm font-medium text-gray-700 mb-2">
              Waktu Mulai
            </label>
            <input
              type="time"
              id="waktu_mulai"
              name="waktu_mulai"
              value={formData.waktu_mulai}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          {/* Waktu Selesai */}
          <div className="mb-6">
            <label htmlFor="waktu_selesai" className="block text-sm font-medium text-gray-700 mb-2">
              Waktu Selesai
            </label>
            <input
              type="time"
              id="waktu_selesai"
              name="waktu_selesai"
              value={formData.waktu_selesai}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          {/* Keterangan */}
          <div className="mb-6">
            <label htmlFor="keterangan" className="block text-sm font-medium text-gray-700 mb-2">
              Keterangan
            </label>
            <textarea
              id="keterangan"
              name="keterangan"
              value={formData.keterangan}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Masukkan keterangan"
              required
            ></textarea>
          </div>

          {/* Lokasi */}
          <div className="mb-6">
            <label htmlFor="lokasi" className="block text-sm font-medium text-gray-700 mb-2">
              Lokasi
            </label>
            <input
              type="text"
              id="lokasi"
              name="lokasi"
              value={formData.lokasi}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Masukkan lokasi"
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
