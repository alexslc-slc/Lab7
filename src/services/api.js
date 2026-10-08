import axios from "axios";

const API = axios.create({
  baseURL: "/api",
});

API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  if (user && user.accessToken) {
    // Si tu backend usa x-access-token:
    config.headers["x-access-token"] = user.accessToken;
    // Si prefiere Bearer:
    // config.headers["Authorization"] = `Bearer ${user.accessToken}`;
  }
  return config;
});

export default API;