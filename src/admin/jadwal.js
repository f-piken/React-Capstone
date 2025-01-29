/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import api from "../api";
import Nav from "./component/nav";
import Header from "./component/header";
import { FaPlus } from "react-icons/fa";
import Create from "./form/jadwal/create";
import Update from "./form/jadwal/update";
import Delete from "./form/jadwal/delete";

const Jadwal = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [scheduleToDelete, setScheduleToDelete] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);  
  const [currentData, setCurrentData] = useState(null);
  const [schedules, setJadwal] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleOpenCreateModal = () => {
    setShowCreateModal(true);
  };

  const handleOpenUpdateModal = (row) => {
    setCurrentData(row);
    setShowUpdateModal(true);
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
    setShowUpdateModal(false);
    setScheduleToDelete(null);
  };

  const handleOpenDeleteModal = (scheduleId) => {
    setScheduleToDelete(scheduleId);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/jadwal');
        setJadwal(response.data);
      } catch (error) {
        console.error('Error fetching schedules:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmitCreate = async (formData) => {
    setLoading(true);

    try {
      const response = await api.post("/jadwal/create", formData);
      setJadwal([...schedules, response.data.data]);
      setShowCreateModal(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitUpdate = async (formData) => {
    setLoading(true);

    try {
      const response = await api.put(`/jadwal/update/${currentData.id}`, formData);
      const updatedData = schedules.map((item) =>
        item.id === currentData.id ? response.data.data : item
      );
      setJadwal(updatedData);
      setShowUpdateModal(false);
    } catch (error) {
      console.error("Error updating form:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (scheduleToDelete) {
      try {
        await api.delete(`/jadwal/delete/${scheduleToDelete}`);
        setJadwal(schedules.filter((item) => item.id !== scheduleToDelete));
        setScheduleToDelete(null);
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  return (
    <div className="flex flex-col h-screen font-sans bg-teal-50">
      <Header hider={user ? { nama: user.nama, gambar: user.gambar } : {}} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      <div className="flex flex-1 overflow-hidden">
        <Nav isSidebarOpen={isSidebarOpen} />

        <main className="flex-1 bg-teal-50 p-6 overflow-y-auto">
          <div className="flex justify-between mb-4">
            <h2 className="text-4xl font-bold">Jadwal</h2>
            <button
              onClick={handleOpenCreateModal}
              className="bg-teal-500 text-white py-2 px-4 rounded-lg flex items-center"
            >
              <FaPlus className="inline-block mr-2 mb-1" /> Create Jadwal
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-teal-300 rounded-lg shadow">
              <thead className="bg-teal-700 text-white">
                <tr>
                  <th className="px-6 py-3 text-left font-medium">Pertemuan</th>
                  <th className="px-6 py-3 text-left font-medium">Tanggal</th>
                  <th className="px-6 py-3 text-left font-medium">Waktu Mulai</th>
                  <th className="px-6 py-3 text-left font-medium">Waktu Selesai</th>
                  <th className="px-6 py-3 text-left font-medium">Lokasi</th>
                  <th className="px-6 py-3 text-left font-medium">Keterangan</th>
                  <th className="px-6 py-3 text-left font-medium">Status</th>
                  <th className="px-6 py-3 text-left font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center px-6 py-4 text-gray-500"
                  >
                    Loading...
                  </td>
                </tr>
              ):schedules.length > 0 ? (
                schedules.map((schedule) => (
                  <tr
                    key={schedule.id}
                    className="hover:bg-teal-100 border-t border-teal-300"
                  >
                    <td className="px-6 py-4">{schedule.pertemuan}</td>
                    <td className="px-6 py-4">{schedule.tanggal}</td>
                    <td className="px-6 py-4">{schedule.waktu_mulai}</td>
                    <td className="px-6 py-4">{schedule.waktu_selesai}</td>
                    <td className="px-6 py-4">{schedule.lokasi}</td>
                    <td className="px-6 py-4">{schedule.keterangan}</td>
                    <td className="px-6 py-4">{schedule.status}</td>
                    {schedule.status === 'Akan Datang' ? (
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleOpenUpdateModal(schedule)}
                          className="bg-teal-500 text-white py-1 px-3 rounded-lg"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleOpenDeleteModal(schedule.id)}
                          className="bg-red-500 text-white py-1 px-3 rounded-lg"
                        >
                          Delete
                        </button>
                      </td>
                    ):(<td className="px-6 py-4"><p>Done</p></td>)}
                  </tr>
                ))) : (
                  <tr>
                    <td
                      colSpan="8"
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

      {showCreateModal && (
        <Create
          onSubmit={handleSubmitCreate}
          onClose={handleCloseModal}
          loading={loading}
        />
      )}

      {showUpdateModal && (
        <Update
          onSubmit={handleSubmitUpdate}
          onClose={handleCloseModal}
          initialData={currentData}
          loading={loading}
        />
      )}

      <Delete
        isOpen={scheduleToDelete !== null}
        onClose={handleCloseModal}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Jadwal;
