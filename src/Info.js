import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

function Info() {
  const pindahHalaman = (url) => {
    window.location.href = url;
  };

  return (
    <div className="App">
      <Header />
      
      {/* Informasi Section */}
      <section id="informasi" className="bg-teal-60 py-40">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-4">Selamat Datang di Penerimaan Mahasiswa Baru</h2>
          <p className="text-lg text-gray-700">Penerimaan mahasiswa baru untuk tahun akademik 2024/2025 telah dibuka. Jangan lewatkan kesempatan untuk bergabung dengan kami dan menjadi bagian dari universitas terbaik!</p>
          <p className="text-xl text-gray-700">Daftarkan dirimu sekarang!</p>
          <button
            id="openForm"
            className="register-button mt-3 bg-teal-800 text-white px-8 py-3 rounded-lg text-xl"
            onClick={() => pindahHalaman('/formulir')}
          >
            Daftar
          </button>
        </div>
      </section>

      {/* Persyaratan Section */}
      <section id="persyaratan" className="py-20 bg-teal-60">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-6">Persyaratan Pendaftaran</h2>
          <ul className="list-disc pl-6 space-y-2 text-lg text-gray-700">
            <li>Warga Negara Indonesia</li>
            <li>Lulusan SMA/SMK/MA atau setara</li>
            <li>Memiliki nilai ujian nasional minimal 70</li>
            <li>Menyiapkan dokumen pendukung seperti fotokopi ijazah dan transkrip nilai</li>
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
              <tr className="border-b border-teal-400">
                <td className="py-3 px-4 text-lg text-gray-700">Pendaftaran Awal</td>
                <td className="py-3 px-4 text-lg text-gray-700">1 Januari - 15 Februari 2024</td>
              </tr>
              <tr className="border-b border-teal-400">
                <td className="py-3 px-4 text-lg text-gray-700">Seleksi Administrasi</td>
                <td className="py-3 px-4 text-lg text-gray-700">16 Februari - 20 Februari 2024</td>
              </tr>
              <tr className="border-b border-teal-400">
                <td className="py-3 px-4 text-lg text-gray-700">Pengumuman Hasil Seleksi</td>
                <td className="py-3 px-4 text-lg text-gray-700">25 Februari 2024</td>
              </tr>
              <tr className="border-b border-teal-400">
                <td className="py-3 px-4 text-lg text-gray-700">Registrasi Ulang</td>
                <td className="py-3 px-4 text-lg text-gray-700">1 Maret - 10 Maret 2024</td>
              </tr>
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
