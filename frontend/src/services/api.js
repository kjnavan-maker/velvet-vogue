import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

api.interceptors.request.use(
  (config) => {
    const authData = localStorage.getItem("velvetVogueAuth");

    if (authData) {
      const parsed = JSON.parse(authData);

      if (parsed?.token) {
        config.headers.Authorization = `Bearer ${parsed.token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;