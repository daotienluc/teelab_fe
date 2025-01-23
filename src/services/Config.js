import axios from "axios";

export const http = axios.create({
  baseURL: "http://localhost:3002/api",
  timeout: 30000,
});
