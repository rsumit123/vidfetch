import React, { useState } from "react";
import axios from "axios";
import "./InstagramDownloader.css"; // Import the CSS file
import Header from "./Header";
import Footer from "./Footer";

const InstagramVideoDownloader = () => {
  // ...
  const [url, setUrl] = useState();
  const [videoUrl, setVideoUrl] = useState();
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setUrl(event.target.value);
  };

  const handleDownload = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}video-id?postUrl=${url}`
      );
      const { video_id } = response.data;

      if (video_id) {
        const video_response = await axios.get(
          `${import.meta.env.VITE_API_URL}video?videoId=${video_id}`
        );

        const { video_url } = video_response.data;

        if (video_url) {
          setVideoUrl(video_url);
        }
      }
    } catch (error) {
      console.error("Error downloading video:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadLinkClick = () => {
    const link = document.createElement("a");
    link.href = videoUrl;
    link.download = "videfetch_insta_video.mp4";
    link.click();
  };
  return (
    <>
      <Header />
      <div className="container-root">
        <div className="container">
          <h2>Download Instagram Videos</h2>
          <div className="input-wrapper">
            <input
              className="input-field"
              type="text"
              placeholder="Enter your instagram video url"
              onChange={handleInputChange}
            />
            <button className="button" onClick={handleDownload}>
              {loading ? "Downloading..." : "Download Video"}
            </button>
          </div>
          {videoUrl && (
            <div className="video-wrapper">
              <a
                className="download-link"
                target="_blank"
                rel="noreferrer"
                data-mediatype="Video"
                onClick={handleDownloadLinkClick}
                download="vidfetch_video"
              >
                Click here to download the video
              </a>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default InstagramVideoDownloader;
