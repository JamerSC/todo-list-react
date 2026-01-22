import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1/todos", // ✅ Axios expects baseURL, not baseUrl
  headers: {
    "Content-Type": "application/json",
  },
});

// Axios – Best practice interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error.response?.data || error);
  },
);

export default api;
