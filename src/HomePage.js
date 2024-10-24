import React from 'react';
import Header from './components/Header';
import Carousel from './components/Carousel';
import Hero from './components/Hero';
import Tentang from './components/Tentang';
import Footer from './components/Footer';
import './App.css';

function HomePage() {
  return (
    <div className="App">
      <Header />
      <Carousel />
      <Hero />
      <Tentang />
      <Footer />
    </div>
  );
}

export default HomePage;