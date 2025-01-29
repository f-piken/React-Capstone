import React, { useEffect, useState } from "react";
import api from "../api";

function Tentang() {
  const [penghargaan, setPenghargaan] = useState([]);
  const [artikel, setArtikel] = useState([]);

  // Mengambil data artikel dari API
  useEffect(() => {
    const fetchArtikel = async () => {
      try {
        const response = await api.get("/artikel"); // Update this to match the correct endpoint
        setArtikel(response.data.artikel);
      } catch (error) {
        console.error("Failed to fetch artikel:", error);
      }
    };
    fetchArtikel();
  }, []);

  // Mengambil data penghargaan dari API atau sumber lain
  useEffect(() => {
    const fetchArtikel = async () => {
      try {
        const response = await api.get(`/penghargaan`)
        setPenghargaan(response.data.penghargaan);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    fetchArtikel();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll(".fade-in, .slide-in-left, .slide-in-right, .scale-in");
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add("active");
        } else {
          el.classList.remove("active");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="py-10 bg-teal-50 mx-4 sm:mx-16">
      <h2 className="font-bold text-center text-3xl sm:text-5xl mb-10">TENTANG</h2>
      <div className="flex flex-col sm:flex-row gap-8 sm:gap-40 ml-0 sm:ml-20">
        <div className="w-full sm:w-1/2">
          <div className="flex flex-col sm:flex-row items-center mb-6 transform transition-all duration-1000 scale-in">
            <img src="/images/v2_59.png" alt="Logo Kampus" className="w-60 mb-4 sm:mb-0 sm:mr-6" />
            <div>
            {artikel[0] && (
                <>
                  <h3 className="font-bold text-3xl sm:text-5xl mb-4">{artikel[0].judul}</h3>
                  <p className="text-xl mb-2">{artikel[0].keterangan}</p>
                  <p>{artikel[0].isi}</p>
                </>
              )}
            </div>
          </div>
          {artikel.slice(1).map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row items-center mb-6 transform transition-all duration-1000 scale-in">
              <div>
                <h3 className="font-bold text-3xl sm:text-5xl mb-4">{item.judul}</h3>
                <p className="text-xl mb-2">{item.keterangan}</p>
                <p>{item.isi}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full sm:w-1/3">
        {Array.isArray(penghargaan) && penghargaan.length > 0 ? (
          penghargaan.map((penghargaan) => (
        <div
          key={penghargaan.id}
          className="h-2/5 mb-6 p-6 sm:p-8 rounded-lg shadow-lg bg-cover bg-center text-white transform transition-all duration-1000 scale-in flex flex-col justify-end"
          style={{
            backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0)), url(${penghargaan.gambar})`,
          }}
        >
          <h4 className="font-bold text-xl sm:text-4xl">{penghargaan.judul}</h4>
          <p className="text-lg sm:text-xl">{penghargaan.content}</p>
        </div>
      ))
      ) : (
        <p>No articles found.</p> // Pesan jika data penghargaan kosong
      )}
    </div>
      </div>
    </section>
  );
}

export default Tentang;
