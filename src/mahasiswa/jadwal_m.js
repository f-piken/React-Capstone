import React, { useEffect, useState } from "react";

const Jadwal = () => {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3002/schedules")
      .then((response) => response.json())
      .then((data) => setSchedules(data))
      .catch((error) => console.error("Failed to fetch schedules:", error));
  }, []);

  return (
    <div className="flex flex-col h-screen bg-teal-100 font-sans">
      {/* Header */}
      <header className="bg-teal-200 text-teal-800 px-6 py-4 flex justify-between items-center shadow">
        <h1 className="text-xl font-bold">Admin Panel</h1>
        <div className="flex items-center">
          <span className="material-icons text-3xl mr-2">account_circle</span>
          <span>Munet</span>
        </div>
      </header>

      {/* Container */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-48 bg-teal-700 text-white flex-shrink-0">
          <nav>
            <ul className="space-y-2 p-4">
              <li>
                <a
                  href="/Dashboard_m"
                  className="block px-4 py-2 rounded hover:bg-teal-600"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="/Jadwal_m"
                  className="block px-4 py-2 rounded hover:bg-teal-600"
                >
                  Jadwal
                </a>
              </li>
              {/* Removed the Pendaftar menu item */}
              <li>
                <a href="/Keuangan_m" className="block px-4 py-2 rounded hover:bg-teal-600">
                  Pembayaran
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 rounded hover:bg-teal-600">
                  Presensi
                </a>
              </li>
              <li>
                <a href="/" className="block px-4 py-2 rounded hover:bg-teal-600">
                  Logout
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-teal-50 p-6 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4">Jadwal</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-teal-300 rounded-lg shadow">
              <thead className="bg-teal-700 text-white">
                <tr>
                  <th className="px-6 py-3 text-left font-medium">NIM</th>
                  <th className="px-6 py-3 text-left font-medium">Nama</th>
                  <th className="px-6 py-3 text-left font-medium">Alamat</th>
                  <th className="px-6 py-3 text-left font-medium">
                    Tempat, Tgl Lahir
                  </th>
                  <th className="px-6 py-3 text-left font-medium">No. Tlp</th>
                  <th className="px-6 py-3 text-left font-medium">Email</th>
                  <th className="px-6 py-3 text-left font-medium">
                    Status Pembayaran
                  </th>
                </tr>
              </thead>
              <tbody>
                {schedules.length > 0 ? (
                  schedules.map((schedule) => (
                    <tr
                      key={schedule.id}
                      className="hover:bg-teal-100 border-t border-teal-300"
                    >
                      <td className="px-6 py-4">{schedule.id}</td>
                      <td className="px-6 py-4">{schedule.nama}</td>
                      <td className="px-6 py-4">{schedule.alamat}</td>
                      <td className="px-6 py-4">{schedule.ttl}</td>
                      <td className="px-6 py-4">{schedule.noTlp}</td>
                      <td className="px-6 py-4">{schedule.email}</td>
                      <td className="px-6 py-4">{schedule.statusPembayaran}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center px-6 py-4 text-gray-500"
                    >
                      Tidak ada jadwal tersedia.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Jadwal;
