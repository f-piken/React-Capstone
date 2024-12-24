import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [step, setStep] = useState(1);
  const [mahasiswa, setMahasiswa] = useState(null); // State untuk menyimpan data mahasiswa
  const currentDate = new Date().toLocaleDateString();

  // Ambil data mahasiswa berdasarkan token yang ada di localStorage
  useEffect(() => {
    const fetchMahasiswaData = async () => {
      try {
        const token = localStorage.getItem('token'); // Ambil token dari localStorage

        if (token) {
          // Set Authorization header dengan Bearer token
          const response = await axios.get('http://localhost:8000/api/mahasiswa/me', {
            headers: {
              Authorization: `Bearer ${token}`, // Kirim token di header
            },
          });

          setMahasiswa(response.data); // Menyimpan data mahasiswa ke state
        } else {
          console.log('Token tidak ditemukan');
        }
      } catch (error) {
        console.error('Error fetching mahasiswa data:', error);
      }
    };

    fetchMahasiswaData();
  }, []); // Effect hanya dijalankan sekali saat komponen pertama kali di-render

  return (
    <div className="flex flex-col h-screen font-sans bg-teal-100">
      {/* Header */}
      <header className="bg-teal-200 text-teal-800 px-6 py-4 flex justify-between items-center shadow">
        <h1 className="text-xl font-bold">Panel Mahasiswa</h1>
        <div className="flex items-center">
          <span className="material-icons text-3xl mr-2">account_circle</span>
          <span>{mahasiswa ? mahasiswa.nama : 'Loading...'}</span> {/* Nama mahasiswa */}
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
                <a
                  href="/absenMahasiswa"
                  className="block px-4 py-2 rounded hover:bg-teal-600"
                >
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
          <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
          <p className="text-gray-700 mb-6">
            Selamat datang di panel mahasiswa, silahkan lihat jadwal dan keperluan lain anda disini.
          </p>

          {/* Profil Card */}
          <div className="bg-teal-200 p-6 rounded-lg shadow flex flex-col items-center text-teal-800 mb-6">
            <div className="w-48 h-48 bg-teal-800 rounded-full mb-4"></div>
            {mahasiswa ? (
              <>
                <h3 className="font-bold">NIM:</h3>
                <p className="mb-2">{mahasiswa.nim}</p>
                <h3 className="font-bold">Nama:</h3>
                <p className="mb-2">{mahasiswa.nama}</p>
                <h3 className="font-bold">Tempat, Tanggal Lahir:</h3>
                <p className="mb-2">{mahasiswa.tempat}, {mahasiswa.tgl_lahir}</p>
                <h3 className="font-bold">Alamat:</h3>
                <p className="mb-2">{mahasiswa.alamat}</p>
                <h3 className="font-bold">No Tlp:</h3>
                <p className="mb-2">{mahasiswa.no_tlp}</p>
                <h3 className="font-bold">Email:</h3>
                <p className="mb-2">{mahasiswa.email}</p>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
