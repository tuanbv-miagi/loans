import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // URL API backend
  // timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor request (thêm token vào header nếu có)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor response (xử lý lỗi chung)
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized");
    }
    return Promise.reject(error);
  }
);

// Base methods
const baseApi = {
  get: (url, params = {}) => api.get(url, { params }),
  post: (url, data) => api.post(url, data),
  put: (url, data) => api.put(url, data),
  delete: (url) => api.delete(url),
};

export default baseApi;
