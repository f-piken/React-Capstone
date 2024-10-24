import React from 'react';

function Tentang() {
  return (
    <section className="tentang">
      <h2>TENTANG</h2>
      <div className="content">
        <div className="left">
          <div className="buka">
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
        <div className="right">
          <div className="card1">
            <h4>Pemenang Lomba</h4>
            <p>Kami bangga dengan mahasiswa yang memenangkan berbagai lomba...</p>
          </div>
          <div className="card2">
            <h4>Penghargaan</h4>
            <p>Penghargaan yang diterima oleh mahasiswa atas prestasi akademik dan non-akademik...</p>
          </div>
          <div className="card3">
            <h4>Seminar</h4>
            <p>Seminar-seminar yang diadakan untuk meningkatkan pengetahuan dan jaringan...</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Tentang;
