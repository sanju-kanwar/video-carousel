import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

export const getVideos = () => API.get("/videos");
export const likeVideo = (videoId) => API.post("/like", { videoId });
export const shareVideo = (videoId, platform) => API.post("/share", { videoId, platform });
