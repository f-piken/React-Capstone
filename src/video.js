import React, { useState } from 'react';
import Header from './components/Header';
import Carousel from './components/Carousel';
import Footer from './components/Footer';

function Video() {
  const [selectedVideo, setSelectedVideo] = useState({
    title: 'Judul Utama',
    description: 'Deskripsi video utama',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Default video URL (YouTube)
  });

  const videos = [
    { title: 'TikTok 1', videoUrl: 'https://www.tiktok.com/embed/7438065662481763602' },
    { title: 'TikTok 2', videoUrl: 'https://www.tiktok.com/embed/7312472190169926918' },
    { title: 'TikTok 3', videoUrl: 'https://www.tiktok.com/embed/7443032536378395922' },
    { title: 'TikTok 4', videoUrl: 'https://www.tiktok.com/embed/7443032536378395922' },
  ];

  const handleVideoClick = (video) => {
    setSelectedVideo({
      title: video.title,
      description: 'Deskripsi untuk ' + video.title,
      videoUrl: video.videoUrl,
    });
  };

  return (
    <div className="App">
      <Header />
      <Carousel />
      <section className="video-section">
        <h1>VIDEO</h1>
        <div className="video-grid"> {/* untuk video tiktok */ }
          {videos.map((video, index) => (
            <div className="video-card" key={index} onClick={() => handleVideoClick(video)}>
              <div className="video-thumbnail">
                <iframe
                  src={video.videoUrl}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                ></iframe>
              </div>
              <p>{video.title}</p>
            </div>
          ))}
        </div>

        <div className="large-video-card"> {/* untuk video youtube atau tiktok */ }
          <div className="video-thumbnail">
            <iframe
              width="560"
              height="315"
              src={selectedVideo.videoUrl}
              title={selectedVideo.title}
              frameBorder="0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
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
