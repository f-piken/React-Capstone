import React, { useEffect } from 'react';

function Hero() {
  const pindahHalaman = (url) => {
    window.location.href = url;
  };

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('fade-in-up'); // Tambahkan kelas animasi
        } else {
          el.classList.remove('fade-in-up'); // Hapus kelas animasi
        }
      });
    };
  
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Jalankan saat pertama kali dirender
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);  

  return (
    <section className="hero text-black">
      <div className="overlay flex flex-col sm:flex-row text-left mt-12 mx-auto max-w-7xl items-center sm:items-start">
        <img
          src="/images/foto.png"
          alt="Institut Teknologi Nasional"
          className="w-full sm:w-2/5 h-auto opacity-80 transform scale-90 animate-on-scroll"
        />
        <div className="isi sm:ml-20 mt-12 sm:mt-20 text-center sm:text-left px-6 sm:px-0">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 animate-on-scroll">
            Pendaftaran Telah Dibuka!
          </h1>
          <p className="text-base sm:text-lg mb-3 animate-on-scroll">
            Pendaftaran mahasiswa baru telah dibuka, jangan lewatkan kesempatan untuk mendaftarkan dirimu ke kampus yang
            kamu impikan. Daftarkan dirimu sekarang sebelum ketinggalan!
          </p>
          <button
            id="openForm"
            className="register-button mt-3 bg-teal-800 text-white px-8 py-3 rounded-lg text-xl animate-on-scroll"
            onClick={() => pindahHalaman('/formulir')}
          >
            Daftar
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
