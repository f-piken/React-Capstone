import React, { useState, useEffect } from 'react';
import api from "../api";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [sessionData, setSessionData] = useState(null);

  // Mengecek apakah ada data yang disimpan di sessionStorage saat komponen dimuat
  useEffect(() => {
    const storedData = sessionStorage.getItem('userSession');
    if (storedData) {
      setSessionData(storedData);
    }
  }, []);

  // Fungsi untuk menghasilkan data sesi acak
  const generateRandomSessionData = () => {
    const randomString = Math.random().toString(36).substr(2, 9); // String acak
    const timestamp = Date.now(); // Waktu saat ini dalam milidetik
    return `${randomString}-${timestamp}`;
  };

  // Fungsi untuk menyimpan data saat link diklik
  const handleLinkClick = async (event) => {
    event.preventDefault(); // Mencegah aksi default dari tag <a>
    
    // Cek apakah data sesi sudah ada di sessionStorage
    let dataToStore = sessionStorage.getItem('userSession');
  
    // Jika belum ada, buat data sesi baru
    if (!dataToStore) {
      dataToStore = generateRandomSessionData();
      sessionStorage.setItem('userSession', dataToStore);
      const hasil = await api.post('/buat-chat', {
        pengirim : dataToStore,
      });
      console.log(hasil.data);
    }
  
    setSessionData(dataToStore); // Update state untuk menampilkan data yang disimpan
    window.location.href = "/Chat"; // Arahkan ke halaman Chat
  };

  const pindahHalaman = (url) => {
    window.location.href = url;
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-teal-100 p-5 fixed w-full z-10">
      <nav className="flex justify-between items-center">
        {/* Tombol Hamburger untuk mobile - berada di kiri */}
        <div className="sm:hidden">
          <button 
            onClick={toggleMenu} 
            className={`text-teal-800 text-3xl transition-transform duration-300 ${menuOpen ? 'rotate-30' : ''}`}
          >
            <div 
              className={`w-6 h-1 bg-teal-800 mb-1 transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
            <div 
              className={`w-6 h-1 bg-teal-800 mb-1 transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`}></div>
            <div 
              className={`w-6 h-1 bg-teal-800 transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
          </button>
        </div>

        <img src="/images/v2_59.png" alt="Logo Kampus" className="w-12 hidden sm:block" />

        <ul className="hidden sm:flex sm:space-x-4 sm:flex-row sm:items-center">
          <li><a href="/" className="text-teal-800 text-lg">Home</a></li>
          <li><a href="/" className="text-teal-800 text-lg">|</a></li>
          <li><a href="/Video" className="text-teal-800 text-lg">Video</a></li>
          <li><a href="/Video" className="text-teal-800 text-lg">|</a></li>
          <li><a href="/Info" className="text-teal-800 text-lg">Info</a></li>
          <li><a href="/Info" className="text-teal-800 text-lg">|</a></li>
          <li><a href="/Chat" onClick={handleLinkClick} className="text-teal-800 text-lg">Bantuan</a></li>
          {/* {sessionData && <p>Stored Session Data: {sessionData}</p>} */}
        </ul>

        {/* Tombol Login */}
        <button 
          className="bg-teal-800 text-white py-2 px-6 rounded-full text-lg hover:bg-teal-700 transition duration-300"
          onClick={() => pindahHalaman('/login')}
        >
          Login
        </button>
      </nav>

      {/* Sidebar Menu (untuk tampilan mobile) */}
      {menuOpen && (
        <div className="sm:hidden fixed inset-0 bg-teal-800 bg-opacity-75 z-20 mt-20">
          <div className="flex flex-col items-start px-6 py-8 text-white">
            <ul className="space-y-6">
              <li><a href="/" className="text-lg" onClick={toggleMenu}>Home</a></li>
              <li><a href="/Video" className="text-lg" onClick={toggleMenu}>Video</a></li>
              <li><a href="/Info" className="text-lg" onClick={toggleMenu}>Info</a></li>
              <li><a href="/chat" className="text-lg" onClick={toggleMenu}>Bantuan</a></li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
