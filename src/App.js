import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './HomePage';
import Formulir from './formulir';
import Video from './video';
import Chat from './chat';
import Login from './login';
import Info from './Info';
import Dashboard from './admin/dashboard';
import Jadwal from './admin/jadwal';
import Pendaftar from './admin/pendaftar';
import Keuangan from './admin/keuangan';
import Absen from './admin/absen';
import ChatAdmin from './admin/chatAdmin';
import ChatMenunggu from './admin/chatMenunggu';
import { getRole } from "./auth";
import Dashboard_m from './mahasiswa/dashboard_m';
import Jadwal_m from './mahasiswa/jadwal_m';
import Pembayaran_m from './mahasiswa/pembayaran_m';
import Absen_m from './mahasiswa/absen_m';

function App() {
  const role = getRole();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/formulir" element={<Formulir />} />
        <Route path="/video" element={<Video />} />
        <Route path="/info" element={<Info />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/login" element={<Login />} />
        
        {role === "admin" ? (
          <>
            <Route path="/dashboardAdmin" element={<Dashboard />} />
            <Route path="/chatadmin" element={<ChatMenunggu />} />
            <Route path="/adminmessage" element={<ChatAdmin />} />
            <Route path="/pembayaran" element={<Keuangan />} />
            <Route path="/jadwal" element={<Jadwal />} />
            <Route path="/pendaftar" element={<Pendaftar />} />
            <Route path="/absen" element={<Absen />} />
          </>
        ) : role === "mahasiswa" ? (
          <>
            <Route path="/dashboardMahasiswa" element={<Dashboard_m />} />
            <Route path="/pembayaranMahasiswa" element={<Pembayaran_m />} />
            <Route path="/jadwalMahasiswa" element={<Jadwal_m />} />
            <Route path="/absenMahasiswa" element={<Absen_m />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
        
        {/* Route wildcard untuk rute yang tidak dikenali */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
