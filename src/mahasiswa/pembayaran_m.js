import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./component/nav";
import Header from "./component/header";
import api from "../api";

const Pembayaran = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [pembayaran, setPembayaran] = useState([]);  // Perbaiki penamaan dari pemabayaran menjadi pembayaran
  const [mahasiswa, setMahasiswa] = useState(null);
  const [loading, setLoading] = useState(true);  // State untuk status loading
  const currentDate = new Date().toLocaleDateString();

  // Fungsi untuk format angka menjadi format Rupiah
  const formatRupiah = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  // Fetch data mahasiswa dan pembayaran
  useEffect(() => {
    const fetchData = async () => {

      try {
        const pembayaranResponse = await api.get('/mahasiswa/pembayaran/me');
        setPembayaran(pembayaranResponse.data); // Perbaiki ini untuk menggunakan pembayaran
        
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);  // Set loading ke false setelah data selesai di-fetch
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-teal-100 font-sans">
      {/* Header */}
      <Header isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>

      {/* Container */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Nav isSidebarOpen={isSidebarOpen} />

        {/* Main Content */}
        <main className="flex-1 bg-teal-50 p-6 overflow-y-auto">
          <h2 className="text-4xl font-bold mb-4">Keuangan</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-teal-300 rounded-lg shadow">
              <thead className="bg-teal-700 text-white">
                <tr>
                  <th className="px-6 py-3 text-left font-medium">ID</th>
                  <th className="px-6 py-3 text-left font-medium">NIM</th>
                  <th className="px-6 py-3 text-left font-medium">Nama</th>
                  <th className="px-6 py-3 text-left font-medium">Nominal</th>
                  <th className="px-6 py-3 text-left font-medium">Metode Pembayaran</th>
                  <th className="px-6 py-3 text-left font-medium">Status Pembayaran</th>
                </tr>
              </thead>
              <tbody>
                {pembayaran.length > 0 ? (
                  pembayaran.map((daftar) => (
                    <tr
                      key={daftar.id}
                      className="hover:bg-teal-100 border-t border-teal-300"
                    >
                      <td className="px-6 py-4">{daftar.id}</td>
                      <td className="px-6 py-4">{daftar.nim}</td>
                      <td className="px-6 py-4">{daftar.nama}</td>
                      <td className="px-6 py-4">{formatRupiah(daftar.nominal)}</td> {/* Format nominal menjadi Rupiah */}
                      <td className="px-6 py-4">{daftar.metode_pembayaran}</td>
                      <td className="px-6 py-4">{daftar.status_pembayaran}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      className="text-center px-6 py-4 text-gray-500"
                    >
                      Tidak ada pendaftar.
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
