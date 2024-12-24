import React, { useEffect, useState } from "react";
import axios from "axios";

const Pembayaran = () => {
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
      const token = localStorage.getItem('token'); // Ambil token dari localStorage

      if (!token) {
        console.log('Token tidak ditemukan');
        setLoading(false);
        return;
      }

      try {
        // Ambil data mahasiswa
        const mahasiswaResponse = await axios.get('http://localhost:8000/api/mahasiswa/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMahasiswa(mahasiswaResponse.data);

        // Ambil data pembayaran
        const pembayaranResponse = await axios.get('http://localhost:8000/api/mahasiswa/pembayaran/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPembayaran(pembayaranResponse.data); // Perbaiki ini untuk menggunakan pembayaran
        
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);  // Set loading ke false setelah data selesai di-fetch
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-xl font-semibold">Memuat data...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-teal-100 font-sans">
      {/* Header */}
      <header className="bg-teal-200 text-teal-800 px-6 py-4 flex justify-between items-center shadow">
        <h1 className="text-xl font-bold">Panel Mahasiswa</h1>
        <div className="flex items-center">
          <span className="material-icons text-3xl mr-2">account_circle</span>
          <span>{mahasiswa ? mahasiswa.nama : 'Nama tidak tersedia'}</span>
        </div>
      </header>

      {/* Container */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-48 bg-teal-700 text-white flex-shrink-0">
          <nav>
            <ul className="space-y-2 p-4">
              <li>
                <a
                  href="/dashboardMahasiswa"
                  className="block px-4 py-2 rounded hover:bg-teal-600"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="/jadwalMahasiswa"
                  className="block px-4 py-2 rounded hover:bg-teal-600"
                >
                  Jadwal
                </a>
              </li>
              <li>
                <a
                  href="/pembayaranMahasiswa"
                  className="block px-4 py-2 rounded hover:bg-teal-600"
                >
                  Pembayaran
                </a>
              </li>
              <li>
                <a href="/Keuangan_m" className="block px-4 py-2 rounded hover:bg-teal-600">
                  Keuangan
                </a>
              </li>
              <li>
                <a href="/" className="block px-4 py-2 rounded hover:bg-teal-600">
                  Presensi
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="block px-4 py-2 rounded hover:bg-teal-600"
                >
                  Logout
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-teal-50 p-6 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4">Pendaftar</h2>
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
