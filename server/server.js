const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;
const videoPath = path.join(__dirname, "data", "videos.json");
let videos = JSON.parse(fs.readFileSync(videoPath, "utf-8"));

app.get("/videos", (req, res) => {
  res.json(videos);
});

app.post("/like", (req, res) => {
  const { videoId } = req.body;
  const video = videos.find((v) => v.id === videoId);
  if (video) {
    video.likes += 1;
    fs.writeFileSync(videoPath, JSON.stringify(videos, null, 2));
    res.json({ success: true, likes: video.likes });
  } else {
    res.status(404).json({ error: "Video not found" });
  }
});

app.post("/share", (req, res) => {
  const { videoId, platform } = req.body;
  console.log(`Shared ${videoId} on ${platform}`);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
