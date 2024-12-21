import React from 'react';
import { useNavigate } from 'react-router-dom';

const nav = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();

    const handleLogout = () => {
        // Hapus token autentikasi dan role dari localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('role');
    
        // Redirect ke halaman login
        navigate('/login');
      };

    return (
        <aside className="w-48 bg-teal-700 text-white flex-shrink-0">
          <nav>
            <ul className="space-y-2 p-4">
              <li>
                <a
                  href="/DashboardAdmin"
                  className="block px-4 py-2 rounded hover:bg-teal-600"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="/Pendaftar"
                  className="block px-4 py-2 rounded hover:bg-teal-600"
                >
                  Pendaftar
                </a>
              </li>
              <li>
                <a
                  href="/Jadwal"
                  className="block px-4 py-2 rounded hover:bg-teal-600"
                >
                  Jadwal
                </a>
              </li>
              <li>
                <a
                  href="/Pembayaran"
                  className="block px-4 py-2 rounded hover:bg-teal-600"
                >
                  Pembayaran
                </a>
              </li>
              <li>
                <a
                  href="/Absen"
                  className="block px-4 py-2 rounded hover:bg-teal-600"
                >
                  Presensi
                </a>
              </li>
              <li>
                <a
                  href="/ChatAdmin"
                  className="block px-4 py-2 rounded hover:bg-teal-600"
                >
                  Chat
                </a>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 rounded hover:bg-red-600 hover:text-white"
                >
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </aside>
    );
};
export default nav;