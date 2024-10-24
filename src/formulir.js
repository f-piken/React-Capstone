import React, { useState } from 'react';
import Header from './components/Header';
import Carousel from './components/Carousel';
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

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Data form:', formData);
    // Tambahkan logika untuk mengirim data atau validasi form di sini
  };

  return (
    <div className="App">
      <Header />
      <div className="sela"></div>
      <div className="form-container">
        <h2>Form Pendaftaran Mahasiswa Baru</h2>
        <form id="form" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nama" className="form-label">Nama Lengkap</label>
            <input
              type="text"
              className="form-control"
              id="nama"
              value={formData.nama}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="nilai" className="form-label">Nilai</label>
            <input
              type="text"
              className="form-control"
              id="nilai"
              value={formData.nilai}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="alamat" className="form-label">Alamat</label>
            <input
              type="text"
              className="form-control"
              id="alamat"
              value={formData.alamat}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="lahir" className="form-label">Tempat, Tanggal Lahir</label>
            <input
              type="text"
              className="form-control"
              id="lahir"
              value={formData.lahir}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="nisn" className="form-label">NISN</label>
            <input
              type="text"
              className="form-control"
              id="nisn"
              value={formData.nisn}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="no" className="form-label">No HP</label>
            <input
              type="text"
              className="form-control"
              id="no"
              value={formData.no}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="jur1" className="form-label">Pilihan Jurusan Utama</label>
            <input
              type="text"
              className="form-control"
              id="jur1"
              value={formData.jur1}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="jur2" className="form-label">Pilihan Jurusan Kedua</label>
            <input
              type="text"
              className="form-control"
              id="jur2"
              value={formData.jur2}
              onChange={handleChange}
              required
            />
          </div>

          <input type="submit" value="Kirim" className="btn btn-primary" />
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Formulir;
