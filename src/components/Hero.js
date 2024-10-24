import React from 'react';

function Hero() {
  const pindahHalaman = (url) => {
    window.location.href = url;
  };

  return (
    <section className="hero">
      <div className="overlay">
        <img src="/images/foto.png" alt="Institut Teknologi Nasional" />
        <div className="isi">
          <h1>Pendaftaran Telah Dibuka!</h1>
          <p>Pendaftaran mahasiswa baru telah dibuka, jangan lewatkan kesempatan untuk mendaftarkan dirimu ke kampus yang kamu impikan. Daftarkan dirimu sekarang sebelum ketinggalan!</p>
          <button id="openForm" className="register-button" onClick={() => pindahHalaman('/formulir')}>Daftar</button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
