import React, { useEffect, useState } from 'react';
import Nav from './component/nav';
import api from '../api';
import Header from './component/header';
import Update from "./form/user/update";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [cek, setCek] = useState();
  const [jadwal, setJadwal] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/me`);
        setUser(response.data.user);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    fetchUser();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const jadwalResponse = await api.get('/jadwal');
        setJadwal(jadwalResponse.data);
        const cekResponse = await api.get('/cek/jadwal');
        setCek(cekResponse.data);

        // Mencari jadwal pertama yang memiliki status 'Akan Datang'
        const upcomingSchedule = jadwalResponse.data.find(item => item.status === 'Akan Datang');
        
        if (upcomingSchedule) {
          // Menyetel step berdasarkan ID pertama yang statusnya 'Akan Datang'
          const firstUpcomingIndex = jadwalResponse.data.indexOf(upcomingSchedule);
          setStep(firstUpcomingIndex);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleOpenUpdateModal = () => {
    setShowUpdateModal(true);
  };

  const handleCloseModal = () => {
    setShowUpdateModal(false);
    setUser(null);
  };

  const handleSubmitUpdate = (formData) => {
    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("username", formData.username);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("role", formData.role);
    if (formData.gambar) formDataToSend.append("gambar", formData.gambar);

    api.post(`/users/update/${user.id}`, formDataToSend)
      .then((response) => {
        setUser(response.data.user);
        setShowUpdateModal(false);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error updating form:", error);
        setLoading(false);
      });
  };

  const handleNextStep = (id, currentStep) => {
    // Pastikan tidak melanjutkan jika sudah di langkah terakhir
    if (currentStep === jadwal.length) return;
  
    // Update step status di jadwal (bisa disesuaikan dengan status yang Anda gunakan)
    const updatedJadwal = [...jadwal];
    updatedJadwal[currentStep].status = 'Terlaksana'; // Gantilah dengan logika status yang sesuai
  
    setJadwal(updatedJadwal); // Update state untuk memberikan feedback visual
  
    // Kirim data ke backend untuk memperbarui status jadwal
    api.post(`/update/jadwal/${id}`, { status: 'Terlaksana' })
      .then((response) => {
        // Menangani respon sukses jika status berhasil diperbarui
        console.log('Status berhasil diperbarui');
        setStep(currentStep + 1); // Lanjutkan ke langkah berikutnya setelah update sukses
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };
  

  return (
    <div className="flex flex-col h-screen font-sans bg-teal-50">
      {/* Header */}
      <Header hider={user ? { nama: user.nama, gambar: user.gambar } : {}} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      {/* Container */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Nav isSidebarOpen={isSidebarOpen} />

        {/* Main Content */}
        <main className="flex-1 bg-teal-50 p-6 overflow-y-auto">
          <h2 className="text-4xl font-bold mb-4">Dashboard</h2>
          <p className="text-gray-700 mb-6">
            Welcome to the admin panel. Here you can manage users, view reports,
            and adjust settings.
          </p>

          {/* Profil Card */}
          <div className="bg-gradient-to-br from-teal-200 via-white to-teal-100 p-8 rounded-xl shadow-lg flex flex-col items-center text-teal-800 mb-6">
            {user ? (
              <>
                {/* Gambar Profil */}
                <div className="relative w-40 h-40">
                  <img
                    src={user.gambar || "https://via.placeholder.com/150"} // Default jika gambar tidak tersedia
                    alt={`Foto profil ${user.name}`}
                    className="w-full h-full rounded-full object-cover border-4 border-teal-300 shadow-lg"
                  />
                  <div className="absolute bottom-0 right-0 bg-teal-600 text-white text-xs font-bold rounded-full px-3 py-1 shadow-md">
                    {user.role}
                  </div>
                </div>

                {/* Informasi Profil */}
                <div className="mt-6 text-center">
                  <h2 className="text-xl font-semibold text-teal-900">{user.name}</h2>
                  <p className="text-sm text-teal-700">@{user.username}</p>
                </div>

                {/* Detail */}
                <div className="mt-4 space-y-3 text-sm text-teal-700">
                  <div className="flex items-center space-x-2">
                    <span className="material-icons text-teal-600">person</span>
                    <span>Nama Lengkap:</span>
                    <strong className="ml-auto">{user.name}</strong>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="material-icons text-teal-600">badge</span>
                    <span>Role:</span>
                    <strong className="ml-auto capitalize">{user.role}</strong>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="material-icons text-teal-600">calendar_today</span>
                    <span>Bergabung:</span>
                    <strong className="ml-auto">{new Date(user.created_at).toLocaleDateString()}</strong>
                  </div>
                </div>

                {/* Aksi */}
                <div className="mt-6">
                  <button className="px-4 py-2 bg-teal-600 text-white rounded-lg shadow-md hover:bg-teal-700 transition" onClick={handleOpenUpdateModal}>
                    Edit Profile
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center w-full h-full">
                <span className="material-icons text-teal-600 animate-spin text-4xl">sync</span>
                <p className="ml-3 text-teal-700">Loading...</p>
              </div>
            )}
          </div>

          {/* Step Indicator */}
          <div className="items-center justify-between mb-6">
            {/* Progress Indicator */}
            <div className="flex justify-center gap-8 mb-8">
              {jadwal.length > 0 &&
                jadwal.map((item, index) => (
                  <div key={index} className="flex flex-col items-center">
                    {/* Circle */}
                    <div
                      className={`w-16 h-16 rounded-full border-4 
                                  ${step > index ? "bg-teal-600 border-teal-600" : "bg-gray-100 border-gray-300"} 
                                  flex items-center justify-center mb-2 shadow-lg transition-all transform 
                                  ${step > index ? "scale-110" : ""}`}
                    >
                      {step > index ? (
                        <span className="material-icons text-white text-3xl">check</span>
                      ) : (
                        <span className="material-icons text-gray-500 text-3xl">radio_button_unchecked</span>
                      )}
                    </div>
                    {/* Day Label */}
                    <span className="text-sm font-semibold text-gray-700 mt-1">{item.pertemuan}</span>
                    {/* Connecting Line */}
                    {index < jadwal.length - 1 && (
                      <div className="w-16 h-1 bg-gray-300 mt-2"></div>
                    )}
                  </div>
                ))}
            </div>
              
            {/* Progress Details */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-teal-700">{cek ? cek.pertemuan : ''}</h3>
                <p className="text-sm text-gray-500 mt-2">{cek ? cek.keterangan : ''}</p>
                <p className="text-sm text-gray-500 mt-1">Tanggal: {cek ? cek.tanggal : ''}</p>
              </div>
              
              {/* Next Step Button */}
              <div className="flex justify-center mt-6">
                <button
                  className={`px-6 py-3 rounded-lg shadow-lg text-white 
                              ${step === jadwal.length ? "bg-gray-400 cursor-not-allowed" : "bg-teal-500 hover:bg-teal-600 transition-all"}`}
                  onClick={() => handleNextStep(cek.id, step)}
                  disabled={step === jadwal.length}
                >
                  {step === jadwal.length ? "Jadwal Selesai" : "Konfirmasi Terlaksana"}
                </button>
              </div>
            </div>
          </div>

        </main>
      </div>

      {showUpdateModal && (
        <Update
          onSubmit={handleSubmitUpdate}
          onClose={handleCloseModal}
          initialData={user}
          loading={loading}
        />
      )}
    </div>
  );
};

export default Dashboard;
