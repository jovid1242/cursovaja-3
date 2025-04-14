import axiosInstance from "../utils/axios";

export const userService = {
  getUsers: async () => {
    const response = await axiosInstance.get("/users");
    return response.data;
  },
};

export const updateStatusUser = async (id, status) => {
  const response = await axiosInstance.put(`/users/${id}/status`, { status });
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await axiosInstance.delete(`/users/${id}`);
  return response.data;
};
