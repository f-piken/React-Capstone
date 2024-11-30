import React, { useEffect } from 'react';

function Hero() {
  const pindahHalaman = (url) => {
    window.location.href = url;
  };

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.hero .isi h1,.hero .isi p, .overlay img, .register-button');
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('active');
        } else {
          el.classList.remove('active');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger check on initial render
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="hero">
      <div className="overlay">
        <img src="/images/foto.png" alt="Institut Teknologi Nasional" className="animate" />
        <div className="isi animate">
          <h1>Pendaftaran Telah Dibuka!</h1>
          <p className="animate">Pendaftaran mahasiswa baru telah dibuka, jangan lewatkan kesempatan untuk mendaftarkan dirimu ke kampus yang kamu impikan. Daftarkan dirimu sekarang sebelum ketinggalan!</p>
          <button id="openForm" className="register-button animate" onClick={() => pindahHalaman('/formulir')}>Daftar</button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
