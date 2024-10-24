import React, { useState } from 'react';
import Header from './components/Header';
import Carousel from './components/Carousel';
import Footer from './components/Footer';

function Video() {
  const [selectedVideo, setSelectedVideo] = useState({
    title: 'Judul Utama',
    description: 'Deskripsi video utama',
  });

  const videos = [
    { title: 'Video 1' },
    { title: 'Video 2' },
    { title: 'Video 3' },
  ];

  const handleVideoClick = (video) => {
    setSelectedVideo({
      title: video.title,
      description: 'Deskripsi untuk ' + video.title,
    });
  };

  return (
    <div className="App">
    <Header/>
    <Carousel/>
    <section className="video-section">
      <h1>VIDEO</h1>
      <div className="video-grid">
        {videos.map((video, index) => (
          <div className="video-card" key={index} onClick={() => handleVideoClick(video)}>
            <div className="video-thumbnail">
              <button className="play-button">▶</button>
            </div>
            <p>{video.title}</p>
          </div>
        ))}
      </div>

      <div className="large-video-card">
        <div className="video-thumbnail">
          <button className="play-button">▶</button>
        </div>
        <p>{selectedVideo.title}</p>
        <p className="description">{selectedVideo.description}</p>
      </div>
    </section>
    <Footer />
    </div>
  );
}

export default Video;
