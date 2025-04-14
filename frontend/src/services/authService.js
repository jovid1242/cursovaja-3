import axiosInstance from "../utils/axios";

export const authService = {
  login: async (credentials) => {
    const { data } = await axiosInstance.post("/users/login", credentials);
    return data;
  },

  register: async (userData) => {
    const { data } = await axiosInstance.post("/users/register", userData);
    return data;
  },

  logout: () => {
    localStorage.removeItem("token");
  },

  getCurrentUser: async () => {
    const { data } = await axiosInstance.get("/users/me");
    return data;
  },
};
