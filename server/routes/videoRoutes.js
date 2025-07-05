const express = require("express");
const router = express.Router();
const videos = require("../data/videos.json");

router.get("/videos", (req, res) => {
  res.json(videos);
});

router.post("/like", (req, res) => {
  const { videoId } = req.body;
  console.log("Like received for:", videoId);
  res.sendStatus(200);
});

router.post("/share", (req, res) => {
  const { videoId, platform } = req.body;
  console.log(`Share on ${platform} for video: ${videoId}`);
  res.sendStatus(200);
});

module.exports = router;
