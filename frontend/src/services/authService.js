import axiosInstance from "../utils/axios";

export const authService = {
  login: async (credentials) => {
    try {
      const { data } = await axiosInstance.post("/users/login", credentials);
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      return data;
    } catch (error) {
      throw error;
    }
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
