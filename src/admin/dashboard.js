import React, { useState } from 'react';
import Nav from './component/nav';

const Dashboard = () => {
  const [step, setStep] = useState(1);
  const currentDate = new Date().toLocaleDateString();

  // Fungsi untuk pindah ke langkah berikutnya
  const nextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const days = ["Hari Ke-1", "Hari Ke-2", "Hari Ke-3", "Hari Ke-4"];

  return (
    <div className="flex flex-col h-screen font-sans bg-teal-100">
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
        <Nav />

        {/* Main Content */}
        <main className="flex-1 bg-teal-50 p-6 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
          <p className="text-gray-700 mb-6">
            Welcome to the admin panel. Here you can manage users, view reports,
            and adjust settings.
          </p>

          {/* Profil Card */}
          <div className="bg-teal-200 p-6 rounded-lg shadow flex flex-col items-center text-teal-800 mb-6">
            <div className="w-48 h-48 bg-teal-800 rounded-full mb-4"></div>
            <h3 className="font-bold">NIM:</h3>
            <p className="mb-2">2218140</p>
            <h3 className="font-bold">Nama:</h3>
            <p className="mb-2">Satriya Adi Yoga</p>
            <h3 className="font-bold">Tempat, Tanggal Lahir:</h3>
            <p className="mb-2">Malang, 10 November 2002</p>
            <h3 className="font-bold">Alamat:</h3>
            <p className="mb-2">Malang</p>
            <h3 className="font-bold">No Tlp:</h3>
            <p className="mb-2">0393817665416</p>
            <h3 className="font-bold">Email:</h3>
            <p className="mb-2">munet@gmail.com</p>
          </div>

          {/* Step Progress */}
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h3 className="text-xl font-semibold mb-4">Progres Proses</h3>

            {/* Step Indicator */}
            <div className="flex items-center justify-between mb-6">
              {["Step 1", "Step 2", "Step 3", "Step 4"].map((stepName, index) => (
                <div key={index} className="flex flex-col items-center">
                  {/* Circle */}
                  <div
                    className={`w-16 h-16 rounded-full border-4 
                      ${step > index ? 'bg-teal-500 border-teal-500' : 'bg-white border-teal-300'} 
                      flex items-center justify-center mb-2 transition-all`}
                  >
                    {step > index ? (
                      <span className="material-icons text-white text-lg">check_circle</span>
                    ) : null}
                  </div>
                  {/* Day Label */}
                  <span className="text-sm text-teal-700">{days[index]}</span>
                  {/* Connecting Line */}
                  {index < 3 && (
                    <div className="w-16 h-1 bg-teal-500"></div>
                  )}
                </div>
              ))}
            </div>

            {/* Progress Description */}
            <div className="text-sm text-teal-700 mb-6">
              <p>{`Step ${step}: This is step description. You are currently at step ${step}.`}</p>
              <p className="mt-2">Tanggal: {currentDate}</p>
            </div>

            {/* Next Step Button */}
            <div className="mt-4">
              <button
                className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
                onClick={nextStep}
                disabled={step === 4}
              >
                {step === 4 ? 'Proses Selesai' : 'Lanjutkan ke Step Selanjutnya'}
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
