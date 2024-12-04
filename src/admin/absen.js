import React, { useState } from 'react';

const Presensi = () => {
  const [presensi, setPresensi] = useState([
    { nim: '2218140', nama: 'Satriya Adi Yoga', hadir: false },
    { nim: '2218141', nama: 'Ayu Lestari', hadir: false },
    { nim: '2218142', nama: 'Budi Santoso', hadir: false },
  ]);

  const toggleHadir = (nim) => {
    setPresensi((prevPresensi) =>
      prevPresensi.map((mhs) =>
        mhs.nim === nim ? { ...mhs, hadir: !mhs.hadir } : mhs
      )
    );
  };

  return (
    <div className="flex flex-col h-screen font-sans bg-teal-100">
      {/* Header */}
      <header className="bg-teal-200 text-teal-800 px-6 py-4 flex justify-between items-center shadow">
        <h1 className="text-xl font-bold">Presensi Mahasiswa</h1>
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
                  href="/Dashboard"
                  className="block px-4 py-2 rounded hover:bg-teal-600"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="/Presensi"
                  className="block px-4 py-2 rounded hover:bg-teal-600"
                >
                  Presensi
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="block px-4 py-2 rounded hover:bg-teal-600"
                >
                  Logout
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-teal-50 p-6 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4">Daftar Kehadiran Mahasiswa</h2>

          <table className="table-auto w-full bg-white rounded-lg shadow">
            <thead>
              <tr className="bg-teal-200 text-teal-800">
                <th className="px-4 py-2">NIM</th>
                <th className="px-4 py-2">Nama</th>
                <th className="px-4 py-2">Status Kehadiran</th>
              </tr>
            </thead>
            <tbody>
              {presensi.map((mhs) => (
                <tr key={mhs.nim} className="text-center">
                  <td className="border px-4 py-2">{mhs.nim}</td>
                  <td className="border px-4 py-2">{mhs.nama}</td>
                  <td className="border px-4 py-2">
                    <button
                      className={`px-4 py-2 rounded ${
                        mhs.hadir
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                      }`}
                      onClick={() => toggleHadir(mhs.nim)}
                    >
                      {mhs.hadir ? 'Hadir' : 'Tidak Hadir'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
};

export default Presensi;
