import React, { useEffect, useState } from "react";
import api from "../api";
import axios from "axios";
import Nav from './component/nav';

const ChatMenunggu = () => {
  const [data, setData] = useState([]); // Data chat
  const [status, setStatus] = useState("menunggu"); // Status chat filter
  const [loading, setLoading] = useState(true); // State loading awalnya true
  const [user, setUser] = useState(null); // State user data
  const [buttonLoading, setButtonLoading] = useState(null); // Loading untuk tombol Setujui
  const [showModal, setShowModal] = useState(false); // State untuk kontrol modal Setujui
  const [showEndModal, setShowEndModal] = useState(false); // State untuk kontrol modal Akhiri
  const [selectedChatId, setSelectedChatId] = useState(null); // ID chat yang dipilih untuk disetujui
  const [selectedEndChatId, setSelectedEndChatId] = useState(null); // ID chat yang dipilih untuk diakhiri
  const API_URL = "http://localhost:8000/api";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API_URL}/me`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setUser(response.data.user);
        console.log(response.data.user);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    fetchUser();
  }, [status]);

  useEffect(() => {
    const fetchChats = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/chatAdmin?status=${status}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, [status]);

  const setStatusToBerlangsung = async (id) => {
    setButtonLoading(id);
    try {
      await axios.put(
        `${API_URL}/chats/${id}/approve`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setData((prevData) =>
        prevData.map((chat) =>
          chat.id === id ? { ...chat, status: "berlangsung" } : chat
        )
      );
    } catch (error) {
      console.error("Gagal mengubah status chat:", error);
    } finally {
      setButtonLoading(null);
    }
  };

  const setStatusToBerakhir = async (id) => {
    setButtonLoading(id);
    try {
      await axios.put(
        `${API_URL}/chats/${id}/end`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setData((prevData) =>
        prevData.map((chat) =>
          chat.id === id ? { ...chat, status: "berakhir" } : chat
        )
      ); 
    } catch (error) {
      console.error("Gagal mengakhiri chat:", error);
    } finally {
      setButtonLoading(null);
    }
  };

  const handleShowModal = (id) => {
    setSelectedChatId(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedChatId(null);
  };

  const handleConfirmApproval = () => {
    if (selectedChatId) {
      setStatusToBerlangsung(selectedChatId);
      handleCloseModal();
    }
  };

  const handleShowEndModal = (id) => {
    setSelectedEndChatId(id); 
    setShowEndModal(true);
  };

  const handleCloseEndModal = () => {
    setShowEndModal(false);
    setSelectedEndChatId(null); 
  };

  const handleConfirmEnd = () => {
    if (selectedEndChatId) {
      setStatusToBerakhir(selectedEndChatId);
      handleCloseEndModal();
    }
  };



  return (
    <div className="flex flex-col h-screen bg-teal-100 font-sans">
      {/* Header */}
      <header className="bg-teal-200 text-teal-800 px-6 py-4 flex justify-between items-center shadow">
        <h1 className="text-xl font-bold">Admin Panel</h1>
        <div className="flex items-center">
          <span className="material-icons text-3xl mr-2">account_circle</span>
          <span>{user ? user.name : "Loading..."}</span>
        </div>
      </header>

      {/* Container */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Nav />

        {/* Main Content */}
        <main className="flex-1 bg-teal-50 p-6 overflow-y-auto">
          <h2 className="text-6xl font-bold mb-4">Chat</h2>

          {/* Filter Status Chat */}
          <div>
            <ul className="flex mb-4">
              {["menunggu", "berlangsung", "berakhir"].map((item) => (
                <li
                  key={item}
                  className={`mr-4 p-2 rounded-lg cursor-pointer ${status === item ? "bg-teal-700 text-white" : "bg-teal-500"}`}
                >
                  <button onClick={() => setStatus(item)}>{item.charAt(0).toUpperCase() + item.slice(1)}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Data Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading ? (
              <div className="col-span-3 text-center text-gray-500">Loading...</div>
            ) : data.length > 0 ? (
              data.map((row) => (
                <div
                  key={row.id}
                  className="bg-white p-4 rounded-lg shadow-lg border border-teal-300"
                >
                  <a
                    href={row.status !== "menunggu" ? `/AdminMessage?pengirim=${encodeURIComponent(row.pengirim)}&status=${row.status}` : "#"}
                    className={`text-xl font-semibold text-teal-700 hover:text-teal-500 ${row.status === "menunggu" ? "pointer-events-none text-gray-500" : ""}`}
                  >
                    {row.pengirim}
                  </a><br />
                  {row.status === "berakhir" ? (
                    <button
                      disabled
                      className="mt-10 px-4 py-2 rounded bg-gray-400 text-gray-700 cursor-not-allowed"
                    >
                      Berakhir
                    </button>
                  ) : row.status === "berlangsung" ? (
                    <button
                      onClick={() => handleShowEndModal(row.id)} // Menampilkan modal konfirmasi Akhiri
                      disabled={buttonLoading === row.id}
                      className={`mt-10 px-4 py-2 rounded ${
                        row.status === "berakhir"
                          ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                          : "bg-teal-700 text-white hover:bg-teal-600"
                      }`}
                    >
                      {buttonLoading === row.id ? "Loading..." : "Akhiri"}
                    </button>
                  ) : (
                    <button
                      onClick={() => handleShowModal(row.id)} // Menampilkan modal konfirmasi Setujui
                      disabled={buttonLoading === row.id || row.status === "berlangsung"}
                      className={`mt-10 px-4 py-2 rounded ${
                        row.status === "berlangsung"
                          ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                          : "bg-teal-700 text-white hover:bg-teal-600"
                      }`}
                    >
                      {buttonLoading === row.id ? "Loading..." : "Setujui"}
                    </button>
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center text-gray-500">
                Tidak ada chat dengan status "{status}".
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Modal Konfirmasi Setujui */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">Konfirmasi Setujui Chat</h3>
            <p>Apakah Anda yakin ingin menyetujui chat ini?</p>
            <div className="mt-4 flex justify-end space-x-4">
              <button onClick={handleCloseModal} className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">
                Batal
              </button>
              <button onClick={handleConfirmApproval} className="px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-600">
                Setujui
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Konfirmasi Akhiri */}
      {showEndModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">Konfirmasi Akhiri Chat</h3>
            <p>Apakah Anda yakin ingin mengakhiri chat ini?</p>
            <div className="mt-4 flex justify-end space-x-4">
              <button onClick={handleCloseEndModal} className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">
                Batal
              </button>
              <button onClick={handleConfirmEnd} className="px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-600">
                Akhiri
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatMenunggu;
