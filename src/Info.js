import React, { useState, useEffect } from "react";
import api from "./api";
import Header from './components/Header';
import Footer from './components/Footer';

function Info() {
  const [syaratData, setSyaratData] = useState([]);
  const [kegiatanData, setKegiatanData] = useState([]);
  const [loadingSyarat, setLoadingSyarat] = useState(true);
  const [loadingKegiatan, setLoadingKegiatan] = useState(true);

  useEffect(() => {
    // Ambil data syarat dari API
    api.get("/syarat")
      .then((response) => {
        setSyaratData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching syarat data:", error);
      })
      .finally(() => {
        setLoadingSyarat(false);
      });

    // Ambil data kegiatan dari API
    api.get("/kegiatan")
      .then((response) => {
        setKegiatanData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching kegiatan data:", error);
      })
      .finally(() => {
        setLoadingKegiatan(false);
      });
  }, []);

  const pindahHalaman = (url) => {
    window.location.href = url;
  };

  return (
    <div className="App">
      <Header />

      {/* Informasi Section */}
      <section id="informasi" className="py-4">
      {kegiatanData[0] && (
        <div
          className="h-screen w-screen bg-cover bg-center flex flex-col justify-center items-center text-white"
          style={{ backgroundImage: "url('./images/info.png')" }}
        >
          <h2 className="text-3xl font-semibold mb-4 text-black">
            Selamat Datang di Penerimaan Mahasiswa Baru
          </h2>
          <p className="text-lg text-center text-black mr-80 ml-80">
            Penerimaan mahasiswa baru untuk tahun akademik {kegiatanData[0].tanggal} telah dibuka.
            Jangan lewatkan kesempatan untuk bergabung dengan kami dan menjadi bagian
            dari universitas terbaik!
          </p>
          <p className="text-xl text-black">Daftarkan dirimu sekarang!</p>
          <button
            id="openForm"
            className="register-button mt-3 bg-teal-800 text-white px-8 py-3 rounded-lg text-xl"
            onClick={() => pindahHalaman('/formulir')}
          >
            Daftar
          </button>
        </div>
        )}
      </section>

      {/* Persyaratan Section */}
      <section id="persyaratan" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-6">Persyaratan Pendaftaran</h2>
          <ul className="list-disc pl-6 space-y-2 text-lg text-gray-700">
            {loadingSyarat ? (
              <li>Loading persyaratan...</li>
            ) : syaratData.length > 0 ? (
              syaratData.map((syarat, index) => (
                <li key={index}>{syarat.syarat}</li>
              ))
            ) : (
              <li>No persyaratan available.</li>
            )}
          </ul>
        </div>
      </section>

      {/* Jadwal Pendaftaran Section */}
      <section id="jadwal" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-6">Jadwal Pendaftaran</h2>
          <table className="min-w-full bg-teal-100 border border-teal-400">
            <thead>
              <tr>
                <th className="py-3 px-4 border-b border-teal-400 text-left text-xl text-gray-800">Aktivitas</th>
                <th className="py-3 px-4 border-b border-teal-400 text-left text-xl text-gray-800">Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {loadingKegiatan ? (
                <tr>
                  <td colSpan="2" className="text-center py-3 text-gray-500">Loading kegiatan...</td>
                </tr>
              ) : kegiatanData.length > 0 ? (
                kegiatanData.slice(1).map((kegiatan, index) => (
                  <tr key={index} className="border-b border-teal-400">
                    <td className="py-3 px-4 text-lg text-gray-700">{kegiatan.kegiatan}</td>
                    <td className="py-3 px-4 text-lg text-gray-700">{kegiatan.tanggal}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-center py-3 text-gray-500">No jadwal available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Kontak Section */}
      <section id="kontak" className="py-20 border-teal-60">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-4">Kontak Kami</h2>
          <p className="text-lg text-gray-700 mb-2">Untuk informasi lebih lanjut, silakan hubungi kami melalui:</p>
          <p className="text-lg text-gray-700">Email: info@university.ac.id</p>
          <p className="text-lg text-gray-700">Telepon: (0341) 123456</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Info;
