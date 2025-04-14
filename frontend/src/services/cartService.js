import axiosInstance from "../utils/axios";

export const cartService = {
  addToCart: async (productId, quantity) => {
    const response = await axiosInstance.post(`/cart`, {
      productId,
      quantity,
    });
    return response.data;
  },

  getCart: async () => {
    const response = await axiosInstance.get(`/cart`);
    return response.data;
  },

  deleteCartItem: async (cartItemId) => {
    const response = await axiosInstance.delete(`/cart/${cartItemId}`);
    return response.data;
  },
};
