import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_URL ||
  "https://ecommerce.4519361-lr59745.twc1.net/api";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to add the token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      // Instead of redirecting here, we'll let the components handle the navigation
      // This prevents the page refresh issue
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
