import React, { useRef, useEffect, useState } from "react";

const VideoCard = ({ video }) => {
  const containerRef = useRef(); // For IntersectionObserver
  const videoElementRef = useRef(); // For video control
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadVideo(true);
        } else {
          if (videoElementRef.current) {
            videoElementRef.current.pause();
          }
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, []);

  return (
    <div className="video-card" ref={containerRef}>
      {shouldLoadVideo ? (
        <video
          ref={videoElementRef}
          src={video.url}
          muted
          controls
          width="100%"
          height="180px"
          style={{ borderRadius: "8px", objectFit: "cover" }}
        />
      ) : (
        <img
          src={video.thumbnail}
          alt={video.title}
          loading="lazy"
          style={{
            width: "100%",
            height: "180px",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
      )}
      <div style={{ padding: "10px" }}>
        <h4 style={{ marginBottom: "5px" }}>{video.title}</h4>
        <p style={{ fontSize: "14px", color: "#555" }}>{video.description}</p>
      </div>
    </div>
  );
};

export default VideoCard;
