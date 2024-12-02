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
    setActiveIndex((prevIndex) => (prevIndex + 1 >= sliderData.length ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    axios
      .get('http://localhost:3002/slider')
      .then((response) => {
        setSliderData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching slider data:', error);
      });

    const interval = setInterval(nextSlide, 5000); // Automatically switch slides every 5 seconds
    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [sliderData.length]);

  return (
    <div className="carousel relative max-w-full overflow-hidden pt-20 mx-auto">
      <div
        className="carousel-inner flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {sliderData.map((slide, index) => (
          <div
            key={slide.id}
            className="carousel-item w-full flex-none"
          >
            <img
              src={slide.source}
              alt={`Slide ${index + 1}`}
              className="w-full h-48 sm:h-72 object-cover"
            />
          </div>
        ))}
      </div>
      <div className="carousel-indicators absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {sliderData.map((_, index) => (
          <span
            key={index}
            className={`indicator w-2 h-2 sm:w-2.5 sm:h-2.5 bg-white rounded-full cursor-pointer ${
              activeIndex === index ? 'bg-teal-600' : 'bg-white'
            }`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
