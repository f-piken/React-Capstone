import React, { useEffect } from 'react';

function Tentang() {
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
    <section className="tentang fade-in">
      <h2 className='afade-in'>TENTANG</h2>
      <div className="content">
        <div className="left slide-in-left">
          <div className="buka fade-in">
            <img src="/images/v2_59.png" alt="Logo Kampus" />
            <div>
              <h3>Program Studi</h3>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            </div>
          </div>
          <h3>Organisasi</h3>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
          <h3>Prestasi</h3>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        </div>
        <div className="right slide-in-right">
          <div className="card1 scale-in">
            <h4>Pemenang Lomba</h4>
            <p>Kami bangga dengan mahasiswa yang memenangkan berbagai lomba...</p>
          </div>
          <div className="card2 scale-in">
            <h4>Penghargaan</h4>
            <p>Penghargaan yang diterima oleh mahasiswa atas prestasi akademik dan non-akademik...</p>
          </div>
          <div className="card3 scale-in">
            <h4>Seminar</h4>
            <p>Seminar-seminar yang diadakan untuk meningkatkan pengetahuan dan jaringan...</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Tentang;
