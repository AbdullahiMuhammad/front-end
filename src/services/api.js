import axios from "axios";

export const proxy = "http://72.61.115.207:5000/api";

const axiosInstance = axios.create({
  baseURL: proxy,
});

// Automatically add token to all requests
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
