// src/components/Form.js

import React from 'react';

const Form = ({ showModal, onClose, onSubmit, formData, handleChange, handleCustomChange }) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Buat Presensi</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label htmlFor="hari" className="block text-teal-800 font-medium mb-2">Pertemuan</label>
            <select
              id="hari"
              className="w-full p-3 border border-teal-300 rounded-lg"
              value={formData.hari}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Pilih hari pertemuan</option>
              <option value="hari ke-1">Hari ke-1</option>
              <option value="hari ke-2">Hari ke-2</option>
              <option value="hari ke-3">Hari ke-3</option>
              <option value="hari ke-4">Hari ke-4</option>
              <option value="hari ke-5">Hari ke-5</option>
              <option value="custom">Tambah Pertemuan</option>
            </select>
            {formData.hari === "custom" && (
              <input
                id="hari"
                type="text"
                value={formData.customHari}
                onChange={handleCustomChange}
                placeholder="Masukkan hari lain"
                className="mt-2 w-full p-3 border border-teal-300 rounded-lg"
              />
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="waktu" className="block text-teal-800 font-medium mb-2">Waktu Terbuka (Menit)</label>
            <select
              id="waktu"
              className="w-full p-3 border border-teal-300 rounded-lg"
              value={formData.waktu}
              onChange={handleChange}
            >
              <option value="" disabled>Pilih waktu selesai</option>
              <option value="5">5 menit</option>
              <option value="10">10 menit</option>
              <option value="15">15 menit</option>
            </select>
          </div>
          <div className='flex'>
            <button onClick={onClose} className="w-full mr-1 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600">Tutup</button>
            <button type="submit" className="w-full ml-1 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
