import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import Header from './components/Header';
import Carousel from './components/Carousel';
import Footer from './components/Footer';

function Video() {
  const [selectedVideo, setSelectedVideo] = useState({
    title: 'Judul Utama Video yang Dipilih',
    description: 'Deskripsi video utama yang Dipilih',
    videoUrl: '',
  });
  
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3002/video')
      .then((response) => {
        setVideos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching video data:", error);
      });
  }, []);

  const handleVideoClick = (video) => {
    setSelectedVideo({
      title: video.judul,
      description: video.description || 'Deskripsi untuk ' + video.judul,
      videoUrl: video.videoUrl,
    });
  };

  return (
    <div className="App">
      <Header />
      <Carousel />
      <section className="video-section">
        <h1>VIDEO</h1>
        <div className="video-grid">
          {videos.map((video) => (
            <div className="video-card" key={video.id} onClick={() => handleVideoClick(video)}>
              <div className="video-thumbnail">
                <iframe
                  src={video.videoUrl}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  title={video.judul}
                ></iframe>
              </div>
              <p>{video.judul}</p>
            </div>
          ))}
        </div>

        <div className="large-video-card">
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
