// src/components/DeleteModal.js
import React from "react";

const Delete = ({ isOpen, onClose, onDelete, loading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-lg font-semibold mb-4">Konfirmasi Penghapusan</h3>
        <p>Apakah Anda yakin ingin menghapus jadwal ini?</p>
        <div className="flex justify-end mt-4">
          <button
            onClick={onDelete}
            className="bg-red-500 text-white py-2 px-4 rounded mr-2"
            disabled={loading}
            >
              {loading ? "Processing..." : "Hapus"}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white py-2 px-4 rounded"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};

export default Delete;
