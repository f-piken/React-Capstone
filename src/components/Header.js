import React from 'react';

function Header() {
  const pindahHalaman = (url) => {
    window.location.href = url;
  };
  return (
    <header>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="#">|</a></li>
          <li><a href="/Video">Video</a></li>
          <li><a href="#">|</a></li>
          <li><a href="/Info">Info</a></li>
          <li><a href="#">|</a></li>
          <li><a href="/chat">Bantuan</a></li>
        </ul>
        <button className="login-button" onClick={() => pindahHalaman('/login')}>Login</button>
      </nav>
    </header>
  );
}

export default Header;
