import React from "react";
import VideoCard from "./VideoCard";

const OuterCarousel = ({ videos, onVideoClick }) => {
  return (
    <div className="outer-carousel">
      {videos.map((video, idx) => (
        <div key={video.id} className="video-card" onClick={() => onVideoClick(idx)}>
          <VideoCard video={video} />
        </div>
      ))}
    </div>
  );
};

export default OuterCarousel;
