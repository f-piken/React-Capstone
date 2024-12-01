import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Carousel() {
  const [sliderData, setSliderData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const goToSlide = (index) => {
    if (index >= sliderData.length) {
      setActiveIndex(0); 
    } else if (index < 0) {
      setActiveIndex(sliderData.length - 1); 
    } else {
      setActiveIndex(index);
    }
  };

  const nextSlide = () => {
    goToSlide(activeIndex + 1);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3002/slider")
      .then((response) => {
        setSliderData(response.data); 
      })
      .catch((error) => {
        console.error("Error fetching slider data:", error);
      });

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <div className="carousel">
      <div 
        className="carousel-inner" 
        style={{ transform: `translateX(-${activeIndex * 100}%)`, transition: 'transform 0.5s ease-in-out' }}
      >
        {sliderData.map((slide, index) => (
          <div 
            key={slide.id} 
            className={`carousel-item ${activeIndex === index ? 'active' : ''}`}
          >
            <img src={slide.source} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>
      <div className="carousel-indicators">
        {sliderData.map((_, index) => (
          <span 
            key={index} 
            className={`indicator ${activeIndex === index ? 'active' : ''}`} 
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
