import React, { useState, useEffect } from 'react';
import api from '../api';
import Nav from './component/nav';
import Header from './component/header';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [mhs, setMhs] = useState(null);
  const [cek, setCek] = useState();
  const [jadwal, setJadwal] = useState([]);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
  // Ambil data user berdasarkan token yang ada di localStorage
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
    const fetchMhs = async () => {
      if (!user?.mahasiswa_id) return;
      try {
        const response = await api.get(`/mahasiswa/${user.mahasiswa_id}`);
        setMhs(response.data.mhs);
      } catch (error) {
        console.error("Failed to fetch mhs:", error);
      }
    };
    fetchMhs();
  }, [user]);

  return (
    <div className="flex flex-col h-screen font-sans bg-teal-100">
      {/* Header */}
      <Header hider={mhs ? { nama: mhs.nama, gambar: mhs.gambar } : {}}  isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>

      {/* Container */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Nav isSidebarOpen={isSidebarOpen} />

        {/* Main Content */}
        <main className="flex-1 bg-teal-50 p-6 overflow-y-auto">
          <h2 className="text-4xl font-bold mb-4">Dashboard</h2>
          <p className="text-gray-700 mb-6">
            Selamat datang di panel user, silahkan lihat jadwal dan keperluan lain anda disini.
          </p>

          {/* Profil Card */}
          <div className="bg-gradient-to-br from-teal-200 via-white to-teal-100 p-8 rounded-xl shadow-lg flex flex-col items-center text-teal-800 mb-6">
            {mhs ? (
              <>
                {/* Gambar Profil */}
                <div className="relative w-40 h-40">
                  <img
                    src={mhs.gambar || "https://via.placeholder.com/150"} // Gambar default jika tidak ada
                    alt={`Foto profil ${mhs.nama}`}
                    className="w-full h-full rounded-full object-cover border-4 border-teal-300 shadow-md"
                  />
                  <div className="absolute bottom-0 right-0 bg-teal-600 text-white text-xs font-bold rounded-full px-3 py-1 shadow-md">
                    Mahasiswa
                  </div>
                </div>
            
                {/* Informasi Profil */}
                <div className="mt-6 text-center">
                  <h2 className="text-xl font-semibold text-teal-900">{mhs.nama}</h2>
                  <p className="text-sm text-teal-700">{mhs.nim}</p>
                </div>
            
                {/* Detail */}
                <div className="mt-4 space-y-3 text-sm text-teal-700 w-full">
                  <div className="flex items-center space-x-2">
                    <span className="material-icons text-teal-600">badge</span>
                    <span>Nama Lengkap:</span>
                    <strong className="ml-auto">{mhs.nama}</strong>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="material-icons text-teal-600">location_on</span>
                    <span>Alamat:</span>
                    <strong className="ml-auto">{mhs.alamat}</strong>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="material-icons text-teal-600">cake</span>
                    <span>TTL:</span>
                    <strong className="ml-auto">{`${mhs.tempat}, ${mhs.tgl_lahir}`}</strong>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="material-icons text-teal-600">phone</span>
                    <span>Telepon:</span>
                    <strong className="ml-auto">{mhs.no_tlp}</strong>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="material-icons text-teal-600">email</span>
                    <span>Email:</span>
                    <strong className="ml-auto">{mhs.email}</strong>
                  </div>
                </div>
            
                {/* Actions */}
                <div className="mt-6">
                  <button className="px-4 py-2 bg-teal-600 text-white rounded-lg shadow-md hover:bg-teal-700 transition">
                    Edit Profil
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
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
