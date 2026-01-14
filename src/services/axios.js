import axios from "axios";

const api = axios.create({
  baseUrl: "http://localhost:8080/api/v1/todos",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
