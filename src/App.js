import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import Dashboard_m from './mahasiswa/dashboard_m';
import Jadwal_m from './mahasiswa/jadwal_m';
import Keuangan_m from './mahasiswa/keuangan_m';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Formulir" element={<Formulir/>} />
        <Route path="/Video" element={<Video/>} />
        <Route path="/Info" element={<Info/>} />
        <Route path="/Chat" element={<Chat/>} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/Dashboard" element={<Dashboard/>} />
        <Route path="/Jadwal" element={<Jadwal/>} />
        <Route path="/Pendaftar" element={<Pendaftar/>} />
        <Route path="/Absen" element={<Absen/>} />
        <Route path="/Keuangan" element={<Keuangan/>} />
        <Route path="/Dashboard_m" element={<Dashboard_m/>} />
        <Route path="/Jadwal_m" element={<Jadwal_m/>} />
        <Route path="/Keuangan_m" element={<Keuangan_m/>} />
        
      </Routes>
    </Router>
  );
}

export default App;