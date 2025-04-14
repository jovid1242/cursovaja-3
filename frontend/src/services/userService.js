import axiosInstance from "../utils/axios";

export const userService = {
  getUsers: async () => {
    const response = await axiosInstance.get("/users");
    return response.data;
  },
  updateStatusUser: async (id, status) => {
    const response = await axiosInstance.put(`/users/${id}/status`, { status });
    return response.data;
  },
  deleteUser: async (id) => {
    const response = await axiosInstance.delete(`/users/${id}`);
    return response.data;
  },
  updateProfile: async (data) => {
    const response = await axiosInstance.put("/users/profile", data);
    return response.data;
  },
};
