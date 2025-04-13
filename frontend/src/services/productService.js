import axiosInstance from "../utils/axios";

export const productService = {
  getProducts: async (params = {}) => {
    const { data } = await axiosInstance.get("/products", { params });
    return data;
  },

  getProductById: async (id) => {
    const { data } = await axiosInstance.get(`/products/${id}`);
    return data;
  },

  createProduct: async (productData) => {
    const { data } = await axiosInstance.post("/products", productData);
    return data;
  },

  updateProduct: async (id, productData) => {
    const { data } = await axiosInstance.put(`/products/${id}`, productData);
    return data;
  },

  deleteProduct: async (id) => {
    const { data } = await axiosInstance.delete(`/products/${id}`);
    return data;
  },
};
