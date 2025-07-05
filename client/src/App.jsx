import React, { useState, useEffect } from "react";
import OuterCarousel from "./components/OuterCarousel";
import InnerModalSlider from "./components/InnerModalSlider";
import "./index.css";
import "./App.css";

function App() {
  const [videos, setVideos] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/videos")
      .then((res) => res.json())
      .then(setVideos);
  }, []);

  return (
    <div className="app">
      <h1 className="heading">🎥 Socially Approved Carousel</h1>
      <OuterCarousel videos={videos} onVideoClick={setSelectedIndex} />
      {selectedIndex !== null && (
        <InnerModalSlider
          videos={videos}
          startIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
        />
      )}
    </div>
  );
}

export default App;
