import React, { useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Footer from './components/Footer';

function Formulir() {
  const [formData, setFormData] = useState({
    nama: '',
    nilai: '',
    alamat: '',
    lahir: '',
    email: '',
    nisn: '',
    no: '',
    metodePembayaran: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3002/api/pendaftaran', formData);
      setMessage('Pendaftaran berhasil disimpan!');
      setFormData({
        nama: '',
        nilai: '',
        alamat: '',
        lahir: '',
        email: '',
        nisn: '',
        no: '',
        metodePembayaran: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setMessage('Terjadi kesalahan saat menyimpan data.');
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg border-2 border-teal-300">
        <h2 className="text-center text-2xl text-teal-800 font-semibold mb-6">Form Pendaftaran Mahasiswa Baru</h2>
        {message && <p className="text-center text-teal-700 mb-4">{message}</p>}
        <form id="form" onSubmit={handleSubmit}>
          {/* Kolom input lainnya */}
          <div className="mb-4">
            <label htmlFor="nama" className="block text-teal-800 font-medium mb-2">Nama</label>
            <input
              type="text"
              id="nama"
              value={formData.nama}
              onChange={handleChange}
              className="w-full p-3 border border-teal-300 rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="nilai" className="block text-teal-800 font-medium mb-2">Nilai</label>
            <input
              type="text"
              id="nilai"
              value={formData.nilai}
              onChange={handleChange}
              className="w-full p-3 border border-teal-300 rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="alamat" className="block text-teal-800 font-medium mb-2">Alamat</label>
            <input
              type="text"
              id="alamat"
              value={formData.alamat}
              onChange={handleChange}
              className="w-full p-3 border border-teal-300 rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="lahir" className="block text-teal-800 font-medium mb-2">Tanggal Lahir</label>
            <input
              type="date"
              id="lahir"
              value={formData.lahir}
              onChange={handleChange}
              className="w-full p-3 border border-teal-300 rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-teal-800 font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-teal-300 rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="nisn" className="block text-teal-800 font-medium mb-2">NISN</label>
            <input
              type="text"
              id="nisn"
              value={formData.nisn}
              onChange={handleChange}
              className="w-full p-3 border border-teal-300 rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="no" className="block text-teal-800 font-medium mb-2">Nomor Telepon</label>
            <input
              type="text"
              id="no"
              value={formData.no}
              onChange={handleChange}
              className="w-full p-3 border border-teal-300 rounded-lg"
              required
            />
          </div>

          {/* Metode Pembayaran */}
          <div className="mb-4">
            <label htmlFor="metodePembayaran" className="block text-teal-800 font-medium mb-2">Metode Pembayaran</label>
            <select
              id="metodePembayaran"
              value={formData.metodePembayaran}
              onChange={handleChange}
              className="w-full p-3 border border-teal-300 rounded-lg"
              required
            >
              <option value="" disabled>Pilih metode pembayaran</option>
              <option value="Transfer Bank">Transfer Bank</option>
              <option value="Kartu Kredit">Kartu Kredit</option>
              <option value="E-Wallet">E-Wallet</option>
            </select>
          </div>

          <div className="text-center mt-6">
            <input
              type="submit"
              value="Kirim"
              className="w-full py-3 bg-teal-500 text-white rounded-lg cursor-pointer hover:bg-teal-600"
            />
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Formulir;
