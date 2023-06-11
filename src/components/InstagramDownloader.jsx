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
  const [videoId, setVideoId] = useState();

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

      setVideoId(video_id);

      if (video_id) {
        const video_response = await axios.get(
          `${import.meta.env.VITE_API_URL}video?videoId=${video_id}`
        );

        const { video_url } = video_response.data;

        if (video_url) {
          setVideoUrl(video_url);
          setLoading(false);
          handleDownloadLinkClick(video_id);
        }
      }
    } catch (error) {
      console.error("Error downloading video:", error);
    }
  };

  const handleDownloadLinkClick = (video_id = "") => {
    const link = document.createElement("a");
    link.href = videoUrl;
    if (video_id !== "") {
      link.download = `vf_insta_${video_id}.mp4`;
    } else {
      link.download = `vf_insta_${videoId}.mp4`;
    }
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
          {videoUrl && !loading && (
            <div className="video-wrapper">
              <a
                className="download-link"
                target="_blank"
                rel="noreferrer"
                data-mediatype="Video"
                onClick={handleDownloadLinkClick}
                download="vidfetch_video"
              >
                Your download should start automatically, if it does not start, <div className="click-here">Click here</div> to download the video
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
