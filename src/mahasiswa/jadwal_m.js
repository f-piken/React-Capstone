import React, { useEffect, useState } from "react";
import axios from 'axios';
import Nav from "./component/nav";
import Header from "./component/header";
import api from "../api";

const Jadwal = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [schedules, setJadwal] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);  // State untuk status loading
  const currentDate = new Date().toLocaleDateString();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const jadwalResponse = await api.get('/jadwal');
        setJadwal(jadwalResponse.data);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-teal-100 font-sans">
      {/* Header */}
      <Header isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>

      {/* Container */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Nav isSidebarOpen={isSidebarOpen} />

        {/* Main Content */}
        <main className="flex-1 bg-teal-50 p-6 overflow-y-auto">
          <h2 className="text-4xl font-bold mb-4">Jadwal</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-teal-300 rounded-lg shadow">
              <thead className="bg-teal-700 text-white">
                <tr>
                  <th className="px-6 py-3 text-left font-medium">Pertemuan</th>
                  <th className="px-6 py-3 text-left font-medium">Waktu Mulai</th>
                  <th className="px-6 py-3 text-left font-medium">Waktu Selesai</th>
                  <th className="px-6 py-3 text-left font-medium">Ruang</th>
                  <th className="px-6 py-3 text-left font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {schedules.length > 0 ? (
                  schedules.map((schedule, index) => (
                    <tr
                      key={index}
                      className="hover:bg-teal-100 border-t border-teal-300"
                    >
                      <td className="px-6 py-4">{schedule.pertemuan}</td>
                      <td className="px-6 py-4">{schedule.waktu_mulai}</td>
                      <td className="px-6 py-4">{schedule.waktu_selesai}</td>
                      <td className="px-6 py-4">{schedule.lokasi}</td>
                      <td className="px-6 py-4">{schedule.status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
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
