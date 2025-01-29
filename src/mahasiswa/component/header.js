import React, { useEffect, useState } from 'react';
import { FaTimes, FaBars } from 'react-icons/fa';
import api from '../../api';

const Header = ({ hider, isSidebarOpen, setIsSidebarOpen }) => {
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const [user, setUser] = useState(null);
  const [mhs, setMhs] = useState(null);

  // Ambil data user berdasarkan token yang ada di localStorage
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/me`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setUser(response.data.user);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    fetchUser();
  }, []);
  
  useEffect(() => {
    const fetchMhs = async () => {
      if (!user?.mahasiswa_id) return;
      try {
        const response = await api.get(`/mahasiswa/${user.mahasiswa_id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setMhs(response.data.mhs);
      } catch (error) {
        console.error("Failed to fetch mhs:", error);
      }
    };
    fetchMhs();
  }, [user]);

  return (
    <header className="bg-teal-200 text-teal-800 px-6 py-4 flex justify-between items-center shadow">
      <div className="flex">
        <h1 className="text-2xl font-bold mr-10">Panel Mahasiswa</h1>
        <button onClick={toggleSidebar} className="text-3xl">
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      <div className="flex items-center">
        <img
          src={mhs ? mhs.gambar : 'not-found.jpg'} // Gunakan gambar dari props
          alt={mhs ? mhs.nama : 'User'}
          className="w-10 h-10 bg-teal-800 mr-4 rounded-full object-cover"
        />
        <span className="text-lg font-medium">{mhs ? mhs.nama : 'User'}</span> {/* Nama user */}
      </div>
    </header>
  );
};

export default Header;
