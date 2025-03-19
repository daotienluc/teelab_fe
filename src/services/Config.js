import axios from "axios";

export const http = axios.create({
  baseURL: "https://teelab-be.onrender.com/api",
  timeout: 30000,
});
