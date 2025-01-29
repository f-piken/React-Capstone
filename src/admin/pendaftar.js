/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Nav from './component/nav';
import api from '../api';
import Header from "./component/header";

const Pendaftar = () => {
  const [data, setData] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
    
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  useEffect(() => {
    // Panggil API Laravel untuk mengambil data
    api.get('/mahasiswa')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col h-screen bg-teal-100 font-sans">
      {/* Header */}
      <Header  isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>

      {/* Container */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Nav isSidebarOpen={isSidebarOpen} />

        {/* Main Content */}
        <main className="flex-1 bg-teal-50 p-6 overflow-y-auto">
          <h2 className="text-4xl font-bold mb-4">Pendaftar</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-teal-300 rounded-lg shadow">
              <thead className="bg-teal-700 text-white">
                <tr>
                <th className="px-6 py-3 text-left font-medium">ID</th>
                  <th className="px-6 py-3 text-left font-medium">NIM</th>
                  <th className="px-6 py-3 text-left font-medium">Nama</th>
                  <th className="px-6 py-3 text-left font-medium">Alamat</th>
                  <th className="px-6 py-3 text-left font-medium">Tempat, Tgl Lahir</th>
                  <th className="px-6 py-3 text-left font-medium">Email</th>
                </tr>
              </thead>
              <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center px-6 py-4 text-gray-500"
                  >
                    Loading...
                  </td>
                </tr>
              ):data.length > 0 ? (
                data.map((row) => (
                  <tr key={row.id}>
                    <td className="px-6 py-4">{row.id}</td>
                    <td className="px-6 py-4">{row.nim}</td>
                    <td className="px-6 py-4">{row.nama}</td>
                    <td className="px-6 py-4">{row.alamat}</td>
                    <td className="px-6 py-4">{row.tempat}, {row.tgl_lahir}</td>
                    <td className="px-6 py-4">{row.email}</td>

                  </tr>
                ))) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center px-6 py-4 text-gray-500"
                    >
                      Tidak ada jadwal tersedia.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Pendaftar;
