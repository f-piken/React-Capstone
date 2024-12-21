import React from 'react';

function Footer() {
  return (
    <footer className="bg-teal-800 text-white p-10 mt-20 sm:mt-80">
      <div className="footer-content flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div className="left1 sm:mr-10 mb-8 sm:mb-0 text-center sm:text-left">
          <h3 className="font-bold text-4xl sm:text-6xl m-0">INSTITUT</h3>
          <h3 className="font-bold text-4xl sm:text-6xl m-0">TEKNOLOGI</h3>
          <h3 className="font-bold text-4xl sm:text-6xl m-0">NASIONAL</h3>
        </div>
        <div className="left sm:w-1/3 mb-8 sm:mb-0 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-semibold">ALAMAT</h1>
          <div className="satu mb-5">
            <p className="text-lg sm:text-xl">Kampus 1</p>
            <p>Jln. Bendungan Sigura-gura No.2 Malang,</p> 
            <p>Jawa Timur, 65145 , Indonesia.</p>
            <p>Telp. 0341-551431</p>
            <p>Fax.0341-553015</p>
          </div>
          <div className="dua">
            <p className="text-lg sm:text-xl">Kampus 2</p>
            <p>Jln. Raya Karanglo Km.2 Malang,</p>
            <p>Jawa Timur, 65145, Indonesia.</p>
            <p>Telp. 0341-417636</p>
            <p>Fax. 0341-417634 Indonesia</p>
          </div>
        </div>
        <div className="right sm:w-1/3 text-center sm:text-left">
          <p className="ajak text-2xl sm:text-3xl font-bold mb-12">Apakah kamu ingin mendaftar kuliah?</p>
          <a className="daftar text-lg sm:text-xl" href="/formulir">Pendaftaran mahasiswa baru <span className="material-icons align-middle">arrow_right_alt</span></a>
          <p className="ikut text-xl sm:text-2xl font-bold mt-12">Ikuti kami juga</p>
          <div className="social-media mt-4 flex justify-center sm:justify-start">
            <a href="#" className="mr-4 sm:mr-6"><img src="../images/v4_5.png" alt="Social Media" className="w-10 sm:w-12" /></a>
            <a href="#" className="mr-4 sm:mr-6"><img src="../images/v4_6.png" alt="Social Media" className="w-10 sm:w-12" /></a>
            <a href="#" className="mr-4 sm:mr-6"><img src="../images/v4_2.png" alt="Social Media" className="w-10 sm:w-12" /></a>
            <a href="#" className="mr-4 sm:mr-6"><img src="../images/v4_3.png" alt="Social Media" className="w-10 sm:w-12" /></a>
            <a href="#" className="mr-4 sm:mr-6"><img src="../images/v4_4.png" alt="Social Media" className="w-10 sm:w-12" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
