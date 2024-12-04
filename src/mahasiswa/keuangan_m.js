import React, { useEffect, useState } from "react";
import axios from "axios";

const Pembayaran = () => {
  const [pembayaran, setPembayaran] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3002/pembayaran") // Pastikan endpoint ini benar
      .then((response) => setPembayaran(response.data))
      .catch((error) => console.error("Error fetching pembayaran data:", error));
  }, []);

  return (
    <div className="flex flex-col h-screen bg-teal-100 font-sans">
      {/* Header */}
      <header className="bg-teal-200 text-teal-800 px-6 py-4 flex justify-between items-center shadow">
        <h1 className="text-xl font-bold">Admin Panel</h1>
        <div className="flex items-center">
          <span className="material-icons text-3xl mr-2">account_circle</span>
          <span>Munet</span>
        </div>
      </header>

      {/* Container */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-48 bg-teal-700 text-white flex-shrink-0">
          <nav>
            <ul className="space-y-2 p-4">
              <li>
                <a href="/Dashboard_m" className="block px-4 py-2 rounded hover:bg-teal-600">Dashboard</a>
              </li>
              <li>
                <a href="/Jadwal_m" className="block px-4 py-2 rounded hover:bg-teal-600">Jadwal</a>
              </li>
              <li>
                <a href="/Keuangan_m" className="block px-4 py-2 rounded hover:bg-teal-600">Pembayaran</a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 rounded hover:bg-teal-600">Presensi</a>
              </li>
              <li>
                <a href="/" className="block px-4 py-2 rounded hover:bg-teal-600">Logout</a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-teal-50 p-6 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4">Pembayaran</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-teal-300 rounded-lg shadow">
              <thead className="bg-teal-700 text-white">
                <tr>
                  <th className="px-6 py-3 text-left font-medium">ID</th>
                  <th className="px-6 py-3 text-left font-medium">Nama</th>
                  <th className="px-6 py-3 text-left font-medium">Alamat</th>
                  <th className="px-6 py-3 text-left font-medium">Email</th>
                  <th className="px-6 py-3 text-left font-medium">Metode Pembayaran</th>
                  <th className="px-6 py-3 text-left font-medium">Status Pembayaran</th>
                </tr>
              </thead>
              <tbody>
                {pembayaran.length > 0 ? (
                  pembayaran.map((bayar) => (
                    <tr
                      key={bayar.id}
                      className="hover:bg-teal-100 border-t border-teal-300"
                    >
                      <td className="px-6 py-4">{bayar.id}</td>
                      <td className="px-6 py-4">{bayar.nama}</td>
                      <td className="px-6 py-4">{bayar.alamat}</td>
                      <td className="px-6 py-4">{bayar.email}</td>
                      <td className="px-6 py-4">{bayar.metodePembayaran}</td>
                      <td className="px-6 py-4">{bayar.statusPembayaran}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center px-6 py-4 text-gray-500"
                    >
                      Tidak ada pembayaran yang terdaftar.
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

export default Pembayaran;

