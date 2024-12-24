import React, { useEffect, useState } from "react";
import axios from "axios";

function Tentang() {
  const [organisasiData, setOrganisasiData] = useState([]);
  const [prestasiData, setPrestasiData] = useState([]);
  const [programStudiData, setProgramStudiData] = useState([]);
  const [artikelData, setArtikelData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3002/organisasi")
      .then((response) => setOrganisasiData(response.data))
      .catch((error) => console.error("Error fetching organisasi data:", error));

    axios
      .get("http://localhost:3002/prestasi")
      .then((response) => setPrestasiData(response.data))
      .catch((error) => console.error("Error fetching prestasi data:", error));

    axios
      .get("http://localhost:3002/programstudi")
      .then((response) => setProgramStudiData(response.data))
      .catch((error) => console.error("Error fetching program studi data:", error));

    axios
      .get("http://localhost:3002/artikel")
      .then((response) => setArtikelData(response.data))
      .catch((error) => console.error("Error fetching artikel data:", error));

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
            <img src="/images/v2_59.png" alt="Logo Kampus" className="w-24 mb-4 sm:mb-0 sm:mr-6" />
            <div>
              <h3 className="font-bold text-3xl sm:text-5xl mb-4">Program Studi</h3>
              <p>Program Studi yang tersedia di kampus kami:</p>
              <ul>
                {programStudiData.map((item) => (
                  <li key={item.id}>{item.content}</li>
                ))}
              </ul>
            </div>
          </div>
          <h3 className="font-bold text-3xl sm:text-5xl mb-4 transform transition-all duration-1000 scale-in">Organisasi</h3>
          <p className="transform transition-all duration-1000 scale-in">Organisasi yang ada di kampus kami:</p>
          <ul className="mb-8 transform transition-all duration-1000 scale-in">
            {organisasiData.map((item) => (
              <li key={item.id}>{item.content}</li>
            ))}
          </ul>

          <h3 className="font-bold text-3xl sm:text-5xl mb-4 transform transition-all duration-1000 scale-in">Prestasi</h3>
          <p className="transform transition-all duration-1000 scale-in">Prestasi yang kami raih antara lain:</p>
          <ul className="transform transition-all duration-1000 scale-in">
            {prestasiData.map((item) => (
              <li key={item.id}>{item.content}</li>
            ))}
          </ul>
        </div>

        <div className="w-full sm:w-1/3">
          {artikelData.map((artikel, index) => (
            <div
              key={artikel.id}
              className="h-2/4 mb-6 p-6 sm:p-8 rounded-lg shadow-lg bg-cover bg-center text-white transform transition-all duration-1000 scale-in flex flex-col justify-end"
              style={{
                backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0)), url(${artikel.images})`,
              }}
            >
              <h4 className="font-bold text-xl sm:text-4xl">{artikel.title}</h4>
              <p className="text-lg sm:text-xl">{artikel.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Tentang;
