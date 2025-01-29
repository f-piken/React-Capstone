/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Nav from './component/nav';
import api from '../api';
import Header from "./component/header";
import Modal from "./form/absen/form"; // Import the Modal
import { FaPlus } from "react-icons/fa";

const Pendaftar = () => {
  const [data, setData] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    customHari: "",
    hari: "",
    waktu: "",
  });
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const hariValue = formData.hari === "custom" ? formData.customHari : formData.hari;
      const response = await api.post("/presensi/create", {
        hari: hariValue,
        waktu: parseInt(formData.waktu),
      });
      const mahasiswaData = response.data.absen.map((item) => ({
        id: item.id,
        nim: item.mahasiswa.nim,
        nama: item.mahasiswa.nama,
        status: item.status,
      }));
      setData(mahasiswaData);
      setMessage(response.data.message);
    } catch (error) {
      console.error(error);
      setMessage("Gagal membuka presensi.");
    } finally {
      setLoading(false);
      setShowModal(false); // Close the modal after submitting
    }
  };

  const handleCustomChange = (e) => {
    setFormData({
      ...formData,
      customHari: e.target.value,
    });
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await api.put(`/presensi-detail/update-status/${id}`, {
        status: newStatus,
      });
      setMessage(response.data.message);

      // Perbarui data setelah status berubah
      setData((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, status: newStatus } : item
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
      setMessage("Gagal mengubah status presensi.");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-teal-100 font-sans">
      {/* Header */}
      <Header isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
  
      {/* Container */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Nav isSidebarOpen={isSidebarOpen} />
  
        {/* Main Content */}
        <main className="flex-1 bg-teal-50 p-6 overflow-y-auto">
          <div className="flex justify-between mb-4">
            <h2 className="text-4xl font-bold mb-4">Presensi</h2>
            <button
              onClick={() => setShowModal(true)} // Open modal
              className="bg-teal-500 text-white py-2 px-4 rounded-lg flex items-center"
            >
              <FaPlus className="inline-block mr-2 mb-1" /> Buat Presensi
            </button>
          </div>
  
          {/* Pesan dari Server */}
          {message && (
            <div className="mb-4 p-4 bg-teal-200 text-teal-800 border-l-4 border-teal-600 rounded-lg">
              {message}
            </div>
          )}
  
          <table className="mt-4 min-w-full bg-white border border-teal-300 rounded-lg shadow">
            <thead className="bg-teal-700 text-white">
              <tr>
                <th className="px-6 py-3 text-left font-medium">NIM</th>
                <th className="px-6 py-3 text-left font-medium">Nama</th>
                <th className="px-6 py-3 text-left font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="text-center px-6 py-4 text-gray-500">Loading...</td>
                </tr>
              ) : data.length > 0 ? (
                data.map((row) => (
                  <tr key={row.id}>
                    <td className="px-6 py-4">{row.nim}</td>
                    <td className="px-6 py-4">{row.nama}</td>
                    <td className="px-6 py-4">
                      <select
                        value={row.status}
                        onChange={(e) => handleStatusChange(row.id, e.target.value)}
                        className="py-2 px-4 border rounded-lg"
                      >
                        <option value="present">Present</option>
                        <option value="absen">Absen</option>
                        <option value="permission">Permission</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center px-6 py-4 text-gray-500">Tidak ada data presensi.</td>
                </tr>
              )}
            </tbody>
          </table>
        </main>
      </div>
  
      {/* Modal */}
      <Modal
        showModal={showModal}
        onClose={() => setShowModal(false)} // Close modal
        onSubmit={handleSubmit}
        formData={formData}
        handleChange={handleChange}
        handleCustomChange={handleCustomChange}
      />
    </div>
  );  
};

export default Pendaftar;
