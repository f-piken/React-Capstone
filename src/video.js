import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Carousel from './components/Carousel';
import Footer from './components/Footer';
import api from './api';

function Video() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Fetch videos from API
  useEffect(() => {
    api.get('/videos') // Adjust the URL as per your backend URL
      .then(response => {
        setVideos(response.data);
        // Set default selected video to the first YouTube video
        const youtubeVideo = response.data.find(video => video.kategori === 'youtube');
        if (youtubeVideo) setSelectedVideo(youtubeVideo);
      })
      .catch(error => console.error('Error fetching videos:', error));
  }, []);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  return (
    <div className="App">
      <Header />
      <Carousel />
      <section className="text-center w-full animate-fadeIn">
        <h1 className="text-6xl mt-10 font-bold mb-8">TIKTOK</h1>
        <div className="video-grid flex flex-wrap justify-around mb-8">
          {videos.filter(video => video.kategori === 'tiktok').map((video, index) => (
            <div
              className={`video-card overflow-hidden w-80 h-[47rem] rounded-lg text-center opacity-0 animate-slideIn animation-delay-${index}`}
              key={video.id}
              onClick={() => handleVideoClick(video)}
            >
              <div className="video-thumbnail h-[48rem] flex justify-center items-center mb-2 rounded-md overflow-hidden">
                <iframe
                  src={video.link}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  title={video.judul}
                  className="rounded-md"
                ></iframe>
              </div>
              <p className="text-sm font-medium">{video.judul}</p>
            </div>
          ))}
        </div>
        <h1 className="text-6xl mt-10 font-bold mb-8">Youtube</h1>
        {selectedVideo && selectedVideo.kategori === 'youtube' && (
          <div className="large-video-card h-[20rem] mx-[5%] mb-8 rounded-lg p-4 text-center opacity-0 animate-fadeIn">
            <div className="video-thumbnail h-full flex justify-center items-center mb-4 rounded-md overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src={selectedVideo.link}
                title={selectedVideo.judul}
                frameBorder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-md"
              ></iframe>
            </div>
            <p className="text-lg font-semibold">{selectedVideo.judul}</p>
            <p className="description text-sm text-gray-600">{selectedVideo.dekskripsi}</p>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}

export default Video;
