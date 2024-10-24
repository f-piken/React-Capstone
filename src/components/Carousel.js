import React, { useState, useEffect } from 'react';

function Carousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalSlides = 3; // Update based on the number of slides

  const goToSlide = (index) => {
    if (index >= totalSlides) {
      setActiveIndex(0);
    } else if (index < 0) {
      setActiveIndex(totalSlides - 1);
    } else {
      setActiveIndex(index);
    }
  };

  const nextSlide = () => {
    goToSlide(activeIndex + 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [activeIndex]);

  return (
    <div className="carousel">
      <div className="carousel-inner" style={{ transform: `translateX(-${activeIndex * 100}%)`, transition: 'transform 0.5s ease-in-out' }}>
        <div className={`carousel-item ${activeIndex === 0 ? 'active' : ''}`}>
          <img src="../images/v1_4.png" alt="Institut Teknologi Nasional" />
        </div>
        <div className={`carousel-item ${activeIndex === 1 ? 'active' : ''}`}>
          <img src="../images/banner2.jpeg" alt="Institut Teknologi Nasional" />
        </div>
        <div className={`carousel-item ${activeIndex === 2 ? 'active' : ''}`}>
          <img src="../images/banner3.jpeg" alt="Institut Teknologi Nasional" />
        </div>
      </div>
      <div className="carousel-indicators">
        <span className={`indicator ${activeIndex === 0 ? 'active' : ''}`} onClick={() => goToSlide(0)}></span>
        <span className={`indicator ${activeIndex === 1 ? 'active' : ''}`} onClick={() => goToSlide(1)}></span>
        <span className={`indicator ${activeIndex === 2 ? 'active' : ''}`} onClick={() => goToSlide(2)}></span>
      </div>
    </div>
  );
}

export default Carousel;

