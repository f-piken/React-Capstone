import React, { useState } from "react";
import Nav from './component/nav';
import Artikel from './settings/artikel';
import Corousel from './settings/corousel';
import Penghargaan from './settings/penghargaan';
import Video from './settings/video';
import Kegiatan from './settings/kegiatan';
import Syarat from './settings/syarat';
import User from './settings/user';
import Header from "./component/header";

const Settings = () => {
  const [page, setPage] = useState("Artikel");  // Set default page as "Artikel"
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col h-screen bg-teal-100 font-sans">
      {/* Header */}
      <Header  isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>

      {/* Container */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Nav isSidebarOpen={isSidebarOpen} />

        {/* Main Content */}
        <main className="flex-1 bg-teal-50 p-6 overflow-y-auto">
          <h2 className="text-4xl font-bold mb-4">Settings</h2>

          {/* Filter Status Chat */}
          <div>
            <ul className="flex mb-4">
              {["Artikel", "Corousel", "Berita", "Video", "KegiatanPMB", "SyaratPMB", "User"].map((item) => (
                <li
                  key={item}
                  className={`w-28 text-center text-white mr-4 p-2 rounded-lg cursor-pointer ${page === item ? "bg-teal-700" : "bg-teal-500"}`}
                >
                  <button onClick={() => setPage(item)}>
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Konten Tabel */}
          <div className="">
            {page === "Artikel" && <Artikel />}
            {page === "Corousel" && <Corousel />}
            {page === "Berita" && <Penghargaan />}
            {page === "Video" && <Video />}
            {page === "KegiatanPMB" && <Kegiatan />}
            {page === "SyaratPMB" && <Syarat />}
            {page === "User" && <User />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
