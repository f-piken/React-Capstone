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
// import Dashboard_m from './mahasiswa/dashboard_m';
// import Jadwal_m from './mahasiswa/jadwal_m';
// import Keuangan_m from './mahasiswa/keuangan_m';


function App() {
  const role = getRole();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Formulir" element={<Formulir/>} />
        <Route path="/Video" element={<Video/>} />
        <Route path="/Info" element={<Info/>} />
        <Route path="/Chat" element={<Chat/>} />
        <Route path="/login" element={<Login />} />
        {role === "admin" && <Route path="/DashboardAdmin" element={<Dashboard/>} />}
        {role === "admin" && <Route path="/ChatAdmin" element={<ChatMenunggu/>} />}
        {role === "admin" && <Route path="/AdminMessage" element={<ChatAdmin/>} />}
        {role === "admin" && <Route path="/Pembayaran" element={<Keuangan/>} />}
        {role === "admin" && <Route path="/Jadwal" element={<Jadwal/>} />}
        {role === "admin" && <Route path="/Pendaftar" element={<Pendaftar/>} />}
        {role === "admin" && <Route path="/Absen" element={<Absen/>} />}
        <Route path="*" element={<Navigate to="/login" />} />
        
        
        
        
        {/* <Route path="/Dashboard_m" element={<Dashboard_m/>} />
        <Route path="/Jadwal_m" element={<Jadwal_m/>} />
        <Route path="/Keuangan_m" element={<Keuangan_m/>} /> */}
        
      </Routes>
    </Router>
  );
}

export default App;