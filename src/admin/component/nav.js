import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaUserAlt, FaCalendarAlt, FaEdit, FaChalkboardTeacher, FaCommentDots, FaCogs, FaSignOutAlt } from 'react-icons/fa';

const Nav = ({ isSidebarOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // Hapus token autentikasi dan role dari localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    // Redirect ke halaman login
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/DashboardAdmin', icon: FaTachometerAlt },
    { name: 'Pendaftar', path: '/Pendaftar', icon: FaUserAlt },
    { name: 'Pembayaran', path: '/Pembayaran', icon: FaCalendarAlt },
    { name: 'Jadwal', path: '/Jadwal', icon: FaChalkboardTeacher },
    { name: 'Presensi', path: '/Absen', icon: FaEdit },
    { name: 'Chat', path: '/ChatAdmin', icon: FaCommentDots },
    { name: 'Settings', path: '/Settings', icon: FaCogs },
  ];

  return (
    <aside className={`w-64 bg-teal-700 text-white flex-shrink-0 transition-all duration-300 ${isSidebarOpen ? 'block' : 'w-[85px]'} p-4`}>
      <nav>
        <ul className="space-y-6">
          {navItems.map(({ name, path, icon: Icon }) => (
            <li key={name} className="text-xl">
              <a
                href={path}
                className={`flex items-center px-4 py-3 rounded-lg transition duration-200 ${
                  location.pathname === path
                    ? 'bg-teal-900 font-bold'
                    : 'hover:bg-teal-600'
                }`}
              >
                <Icon className={`inline-block ${isSidebarOpen ? 'mr-3' : ''}`} /> {isSidebarOpen && name}
              </a>
            </li>
          ))}
          <li className="text-xl">
            <button
              onClick={handleLogout}
              className="flex items-center w-full text-left px-4 py-3 rounded-lg hover:bg-red-600 hover:text-white transition duration-200"
            >
              <FaSignOutAlt className={`inline-block ${isSidebarOpen ? 'mr-3' : ''}`} /> {isSidebarOpen && 'Logout'}
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Nav;
