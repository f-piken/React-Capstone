import React, { useEffect, useState } from 'react';
import { FaTimes, FaBars } from 'react-icons/fa';
import api from '../../api';

const Header = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/me`)
        setUser(response.data.user);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    fetchUser();
  }, []);

  return (
    <header className="bg-teal-600 text-teal-100 px-6 py-4 flex justify-between items-center shadow-lg">
    <div className="flex items-center">
      <h1 className="text-3xl font-semibold mr-10 text-white">Admin Panel</h1>
      <button onClick={toggleSidebar} className="text-3xl text-white">
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>
    </div>
    <div className="flex items-center space-x-3">
      <img
        src={user ? user.gambar : 'not-found.jpg'} 
        alt={user ? user.name : 'User'}
        className="w-10 h-10 bg-teal-800 rounded-full object-cover border-2 border-white"
      />
      <span className="text-lg text-white font-semibold">{user ? user.name : 'Loading...'}</span>
    </div>
  </header>
  );
};

export default Header;
