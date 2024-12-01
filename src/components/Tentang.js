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
    <section className="tentang fade-in">
      <h2 className="afade-in">TENTANG</h2>
      <div className="content">
        <div className="left slide-in-left">
          <div className="buka fade-in">
            <img src="/images/v2_59.png" alt="Logo Kampus" />
            <div>
              <h3>Program Studi</h3>
              <p>Program Studi yang tersedia di kampus kami : </p>
              <ul>
                {programStudiData.map((item) => (
                  <li key={item.id}>{item.content}</li>
                ))}
              </ul>
            </div>
          </div>
          <h3>Organisasi</h3>
          <p>Organisasi yang ada di kampus kami : </p>
          <ul>
            {organisasiData.map((item) => (
              <li key={item.id}>{item.content}</li>
            ))}
          </ul>
          <h3>Prestasi</h3>
          <p>Prestasi yang kami raih antara lain : </p>
          <ul>
            {prestasiData.map((item) => (
              <li key={item.id}>{item.content}</li>
            ))}
          </ul>
        </div>
        <div className="right slide-in-right">
          {artikelData.map((artikel, index) => (
            <div
              key={artikel.id}
              className={`card${index + 1} scale-in`}
              style={{
                backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0)), url(${artikel.images})`,
              }}
            >
              <h4>{artikel.title}</h4>
              <p>{artikel.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Tentang;
