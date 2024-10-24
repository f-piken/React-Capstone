import React from 'react';

function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="left1">
          <h3>INSTITUT</h3>
          <h3>TEKNOLOGI</h3>
          <h3>NASIONAL</h3>
        </div>
        <div className="left">
          <h1>ALAMAT</h1>
          <div className="satu">
          <p>Kampus 1</p>
          <p>Jln. Bendungan Sigura-gura No.2 Malang , Jawa Timur,  65145 , Indonesia.</p>
          <p>Telp. 0341-551431</p>
          <p>Fax.0341-553015</p>
          </div>
          <div className="dua">
          <p>Kampus 2</p>
          <p>Jln. Raya Karanglo Km.2 Malang, Jawa Timur, 65145, Indonesia.</p>
          <p>Telp. 0341-417636</p>
          <p>Fax. 0341-417634 Indonesia</p>
          </div>
        </div>
        <div className="right">
          <p className="ajak">Apakah kamu ingin mendaftar kuliah?</p>
          <a className="daftar" href="#">Pendaftaran mahasiswa baru <span className="material-icons">arrow_right_alt</span></a>
          <p className="ikut">Ikuti kami juga</p>
          <div className="social-media">
            <a href="#"><img src="../images/v4_5.png" alt="Social Media" /></a>
            <a href="#"><img src="../images/v4_6.png" alt="Social Media" /></a>
            <a href="#"><img src="../images/v4_2.png" alt="Social Media" /></a>
            <a href="#"><img src="../images/v4_3.png" alt="Social Media" /></a>
            <a href="#"><img src="../images/v4_4.png" alt="Social Media" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
