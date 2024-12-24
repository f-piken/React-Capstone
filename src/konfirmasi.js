import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

function Konfirmasi() {
    fetch('/update-payment-status', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            payment_id: 1, // Ganti dengan ID pembayaran yang sesuai
            status: 'Paid',
        }),
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));

  return (
    <div className="App">
      <Header />
        <div className="flex items-center justify-center h-screen bg-teal-60">
            <div className="bg-white p-8 rounded-lg shadow-lg w-80 text-center">
              <h2 className="text-2xl font-semibold mb-4">Pembayaran!</h2>
              <p className="text-gray-600 mb-6">Konfirmasi pembayaran sekarang.</p>
              <button className="px-6 py-3 bg-teal-800 text-white rounded-lg hover:bg-teal-600 focus:outline-none">
                Bayar
              </button>
            </div>
        </div>
      <Footer />
    </div>
  );
}

export default Konfirmasi;
