import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./component/header";
import Nav from "./component/nav";
import api from "../api";

const AbsenMahasiswa = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [presensi, setPresensi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Fetch data presensi
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/mahasiswa/presensi/me");
        setPresensi(response.data.presensi);
      } catch (error) {
        console.error("Error fetching presensi data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle submit presensi
  const handleSubmitPresensi = async (presensiId) => {
    try {
      const response = await api.post("/mahasiswa/presensi/submit", {
        presensi_id: presensiId,
      });
      setMessage(response.data.message);

      // Refresh data presensi
      const updatedPresensi = presensi.map((item) => {
        if (item.id === presensiId) {
          return {
            ...item,
            presensiDetails: [{ ...item.presensi_details[0], status: "present" }],
            is_open: false,
          };
        }
        return item;
      });
      setPresensi(updatedPresensi);
    } catch (error) {
      console.error("Error submitting presensi:", error);
      setMessage("Gagal melakukan presensi.");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-teal-100 font-sans">
      <Header isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <div className="flex flex-1 overflow-hidden">
        <Nav isSidebarOpen={isSidebarOpen} />
        <main className="flex-1 bg-teal-50 p-6 overflow-y-auto">
          <h2 className="text-4xl font-bold mb-4">Presensi</h2>
          {message && <div className="mb-4 text-green-600">{message}</div>}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-teal-300 rounded-lg shadow">
              <thead className="bg-teal-700 text-white">
                <tr>
                  <th className="px-6 py-3 text-left font-medium">Hari</th>
                  <th className="px-6 py-3 text-left font-medium">Waktu Mulai</th>
                  <th className="px-6 py-3 text-left font-medium">Waktu Selesai</th>
                  <th className="px-6 py-3 text-left font-medium">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {presensi.length > 0 ? (
                  presensi.map((item) => {
                    const detail = item.presensi_details[0];
                    return (
                      <tr
                        key={item.id}
                        className="hover:bg-teal-100 border-t border-teal-300"
                      >
                        <td className="px-6 py-4">{item.hari}</td>
                        <td className="px-6 py-4">{item.start_time}</td>
                        <td className="px-6 py-4">{item.end_time}</td>
                        <td className="px-6 py-4">
                          {item.is_open && detail?.status === "absen" ? (
                            <button
                              onClick={() => handleSubmitPresensi(item.id)}
                              className="bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600"
                            >
                              Submit Presensi
                            </button>
                          ) : (
                            <span className="text-gray-500">
                              {detail?.status === "present"
                                ? "Sudah Presensi"
                                : "Presensi Ditutup"}
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center px-6 py-4 text-gray-500"
                    >
                      Tidak ada presensi yang tersedia.
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

export default AbsenMahasiswa;
