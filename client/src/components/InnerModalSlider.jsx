import React, { useState, useEffect, useRef } from "react";

const InnerModalSlider = ({ videos, startIndex, onClose }) => {
  const [current, setCurrent] = useState(startIndex);

  const handlePrev = () => {
    setCurrent((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrent((prev) => Math.min(prev + 1, videos.length - 1));
  };

  const visibleVideos = videos.slice(current, current + 3);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} style={{ float: "right" }}>❌</button>
        <h2>Featured Videos</h2>

        <div className="inner-carousel">
          {visibleVideos.map((video) => (
            <VideoCardInner key={video.id} video={video} />
          ))}
        </div>

        <div style={{ marginTop: "10px", textAlign: "center" }}>
          <button onClick={handlePrev}>⬅️ Prev</button>
          <button onClick={handleNext}>Next ➡️</button>
        </div>
      </div>
    </div>
  );
};

const VideoCardInner = ({ video }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting && videoRef.current) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }, { threshold: 0.5 });

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  const togglePlay = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid.play();
      setIsPlaying(true);
    } else {
      vid.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = !vid.muted;
    setIsMuted(vid.muted);
  };

  const handleProgress = () => {
    const vid = videoRef.current;
    if (vid && vid.duration) {
      setProgress((vid.currentTime / vid.duration) * 100);
    }
  };

  const handleLike = async () => {
    const newLiked = !liked;
    setLiked(newLiked);
    await fetch("http://localhost:5000/like", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ videoId: video.id }),
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(video.url);
    fetch("http://localhost:5000/share", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ videoId: video.id, platform: "copy_link" }),
    });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleCommentSubmit = () => {
    console.log("Comment:", comment);
    setComment("");
  };

  return (
   <div className="inner-video">
  <div style={{ flex: 1 }}>
    {loading && <div className="spinner" />}
    <video
      ref={videoRef}
      src={video.url}
      muted={isMuted}
      controls
      autoPlay={false}
      onCanPlay={() => setLoading(false)}
      onTimeUpdate={handleProgress}
      style={{ width: "100%", borderRadius: "8px", height: "180px" }}
    />
    <progress value={progress} max="100" style={{ width: "100%", marginTop: "5px" }} />
  </div>

  <div className="video-controls" style={{ marginTop: "10px", justifyContent: "space-between" }}>
    <button style={{ background: "none", border: "none", cursor: "pointer" }} onClick={togglePlay}>{isPlaying ? "⏸" : "▶️"}</button>
    <button style={{ background: "none", border: "none", cursor: "pointer" }} onClick={toggleMute}>{isMuted ? "🔇" : "🔊"}</button>
    <button
      onClick={handleLike}
      style={{ color: liked ? "red" : "gray", background: "none", border: "none", cursor: "pointer" }}
    >
      {liked ? "❤️" : "🤍"}
    </button>
    <button style={{ background: "none", border: "none", cursor: "pointer" }} onClick={handleShare}>🔗</button>
  </div>

  <div className="comment-box" style={{ marginTop: "10px" }}>
    <textarea
      placeholder="Add a comment..."
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      style={{ width: "100%", height: "60px", resize: "none", borderRadius: "6px", padding: "6px" }}
    />
    <button onClick={handleCommentSubmit} style={{marginTop: "8px",
    padding: "8px 16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background-color 0.2s ease",}}>
      Post
    </button>
  </div>

  {showToast && (
    <div style={{
      position: "fixed",
      bottom: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      backgroundColor: "#333",
      color: "#fff",
      padding: "10px 20px",
      borderRadius: "6px",
      zIndex: 99999,
    }}>
      🔗 Link copied to clipboard!
    </div>
  )}
</div>

  );
};

export default InnerModalSlider;
