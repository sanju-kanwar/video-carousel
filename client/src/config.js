const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "" // For Render deployment — same origin
    : "http://localhost:5000"; // For local dev

export default BASE_URL;
