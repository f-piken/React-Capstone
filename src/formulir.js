import React, { useState } from 'react';
import api from './api';
import Header from './components/Header';
import Footer from './components/Footer';
import { useNavigate } from 'react-router-dom';

function Formulir() {
  const [formData, setFormData] = useState({
    nama: '',
    nilai: '',
    alamat: '',
    tempat: '',
    lahir: '',
    email: '',
    nisn: '',
    no: '',
    metodePembayaran: '',
  });

  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);  // State to manage loading
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  // Show loading popup
    try {
        const response = await api.post('/daftar', formData);

        const paymentDetails = {
          id: response.data.transaction_id,  // Misalnya, ID transaksi dikirim dari backend
          nominal: formData.nilai,  // Nilai pembayaran diambil dari form
          created_at: new Date().toISOString(),  // Tanggal pembuatan transaksi
        };
    
        // Kirim email pembayaran
        await api.post('/kirim-email-pembayaran', {
          user: {
            email: formData.email,
            nama: formData.nama,
          },
          paymentDetails,
        });

        alert('Pendaftaran berhasil, dan email pembayaran telah dikirim!');

        navigate('/');
        setMessage(response.data.message);
    } catch (error) {
        setMessage('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
        setLoading(false);  // Hide loading popup after the process is complete
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="pt-[8rem]">
        <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg border-2 border-teal-300">
          <h2 className="text-center text-2xl text-teal-800 font-semibold mb-6">Form Pendaftaran Mahasiswa Baru</h2>
          {message && <p className="text-center text-teal-700 mb-4">{message}</p>}

          {/* Loading Popup */}
          {loading && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg">
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full border-t-4 border-teal-500 h-16 w-16"></div>
                </div>
                <p className="text-center mt-4 text-teal-700">Sedang memproses...</p>
              </div>
            </div>
          )}

          <form id="form" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <label htmlFor="tempat" className="block text-teal-800 font-medium mb-2">Tempat Lahir</label>
                <input
                  type="text"
                  id="tempat"
                  value={formData.tempat}
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
              <div className="mb-4 col-span-2">
                <label htmlFor="metodePembayaran" className="block text-teal-800 font-medium mb-2">Metode Pembayaran</label>
                <select
                  id="metodePembayaran"
                  value={formData.metodePembayaran}
                  onChange={handleChange}
                  className="w-full p-3 border border-teal-300 rounded-lg"
                  required
                >
                  <option value="" disabled>Pilih metode pembayaran</option>
                  <option value="transfer_bank">Transfer Bank</option>
                  <option value="gopay">Gopay</option>
                  <option value="shopeepay">ShopeePay</option>
                  <option value="qris">QRIS</option>
                </select>
              </div>
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
      </div>
      <Footer />
    </div>
  );
}

export default Formulir;