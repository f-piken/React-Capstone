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
    jur1: '',
    jur2: ''
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
      // Kirim data ke endpoint /pendaftaran
      await axios.post('http://localhost:3002/pendaftaran', formData);
      setMessage('Pendaftaran berhasil disimpan!');
      setFormData({
        nama: '',
        nilai: '',
        alamat: '',
        lahir: '',
        email: '',
        nisn: '',
        no: '',
        jur1: '',
        jur2: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setMessage('Terjadi kesalahan saat menyimpan data.');
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="sela"></div>
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg border-2 border-teal-300">
        <h2 className="text-center text-2xl text-teal-800 font-semibold mb-6">Form Pendaftaran Mahasiswa Baru</h2>
        {message && <p className="text-center text-teal-700 mb-4">{message}</p>}
        <form id="form" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nama" className="block text-teal-800 font-medium mb-2">Nama Lengkap</label>
            <input
              type="text"
              className="w-full p-3 border border-teal-300 rounded-lg focus:border-teal-500 focus:ring focus:ring-teal-300"
              id="nama"
              value={formData.nama}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="nilai" className="block text-teal-800 font-medium mb-2">Nilai</label>
            <input
              type="text"
              className="w-full p-3 border border-teal-300 rounded-lg focus:border-teal-500 focus:ring focus:ring-teal-300"
              id="nilai"
              value={formData.nilai}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="alamat" className="block text-teal-800 font-medium mb-2">Alamat</label>
            <input
              type="text"
              className="w-full p-3 border border-teal-300 rounded-lg focus:border-teal-500 focus:ring focus:ring-teal-300"
              id="alamat"
              value={formData.alamat}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="lahir" className="block text-teal-800 font-medium mb-2">Tempat, Tanggal Lahir</label>
            <input
              type="text"
              className="w-full p-3 border border-teal-300 rounded-lg focus:border-teal-500 focus:ring focus:ring-teal-300"
              id="lahir"
              value={formData.lahir}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-teal-800 font-medium mb-2">Email Address</label>
            <input
              type="email"
              className="w-full p-3 border border-teal-300 rounded-lg focus:border-teal-500 focus:ring focus:ring-teal-300"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="nisn" className="block text-teal-800 font-medium mb-2">NISN</label>
            <input
              type="text"
              className="w-full p-3 border border-teal-300 rounded-lg focus:border-teal-500 focus:ring focus:ring-teal-300"
              id="nisn"
              value={formData.nisn}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="no" className="block text-teal-800 font-medium mb-2">No HP</label>
            <input
              type="text"
              className="w-full p-3 border border-teal-300 rounded-lg focus:border-teal-500 focus:ring focus:ring-teal-300"
              id="no"
              value={formData.no}
              onChange={handleChange}
              required
            />
          </div>

          <div className="text-center mt-6">
            <input type="submit" value="Kirim" className="w-full py-3 bg-teal-500 text-white rounded-lg cursor-pointer hover:bg-teal-600 focus:outline-none" />
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Formulir;
