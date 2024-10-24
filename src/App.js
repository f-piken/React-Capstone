import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import Formulir from './formulir';
import Video from './video';
import Chat from './chat';
import Login from './login';
import Dashboard from './admin/dashboard';
import Jadwal from './admin/jadwal';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Formulir" element={<Formulir/>} />
        <Route path="/Video" element={<Video/>} />
        <Route path="/Chat" element={<Chat/>} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/Dashboard" element={<Dashboard/>} />
        <Route path="/Jadwal" element={<Jadwal/>} />
      </Routes>
    </Router>
  );
}

export default App;