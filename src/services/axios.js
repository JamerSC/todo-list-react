import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1/todos", // ✅ Axios expects baseURL, not baseUrl
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
