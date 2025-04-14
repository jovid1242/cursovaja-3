import axiosInstance from "../utils/axios";

export const orderService = {
  createOrder: async () => {
    const response = await axiosInstance.post(`/orders/from-cart`);
    return response.data;
  },

  getOrders: async () => {
    const response = await axiosInstance.get(`/orders`);
    return response.data;
  },

  getOrderById: async (id) => {
    const response = await axiosInstance.get(`/orders/${id}`);
    return response.data;
  },

  getOrdersByUser: async (userId) => {
    const response = await axiosInstance.get(`/orders/user/${userId}`);
    return response.data;
  },

  updateOrder: async (id, data) => {
    const response = await axiosInstance.put(`/orders/${id}`, data);
    return response.data;
  },

  deleteOrder: async (id) => {
    const response = await axiosInstance.delete(`/orders/${id}`);
    return response.data;
  },
};
