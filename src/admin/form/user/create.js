import React, { useState } from "react";

const Create = ({ onSubmit, onClose, loading }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    role: "",
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
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white w-1/2 rounded-lg p-6 shadow-lg animate__animated animate__zoomIn">
        <h2 className="text-2xl font-semibold text-teal-700 mb-6 text-center">Tambah User</h2>
        <form onSubmit={handleSubmit}>
          {/* Name */}
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
              placeholder="Masukkan name"
              required
            />
          </div>

          {/* Username */}
          <div className="mb-6">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Masukkan username"
              required
            />
          </div>
          
          {/* Role */}
          <div className="mb-4">
            <label htmlFor="role" className="block text-teal-800 font-medium mb-2">Metode Pembayaran</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full p-3 border border-teal-300 rounded-lg"
              required
            >
              <option value="" disabled>Pilih Role</option>
              <option value="admin">Admin</option>
              <option value="mahasiswa">Mahasiswa</option>
            </select>
          </div>

          {/* Password */}
          <div className="mb-6 relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}  // Menggunakan state showPassword untuk menentukan tipe input
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Masukkan password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)} // Toggle visibilitas password
              className="absolute inset-y-0 right-0 flex items-center px-3 mt-7 text-teal-500"
            >
              {showPassword ? (
                <span className="material-icons">visibility_off</span>
              ) : (
                <span className="material-icons">visibility</span>
              )}
            </button>
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
