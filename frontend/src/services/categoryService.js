import axiosInstance from "../utils/axios";

export const categoryService = {
  getCategories: async () => {
    const { data } = await axiosInstance.get("/categories");
    return data;
  },

  getCategoryById: async (id) => {
    const { data } = await axiosInstance.get(`/categories/${id}`);
    return data;
  },

  createCategory: async (categoryData) => {
    const { data } = await axiosInstance.post("/categories", categoryData);
    return data;
  },

  updateCategory: async (id, categoryData) => {
    const { data } = await axiosInstance.put(`/categories/${id}`, categoryData);
    return data;
  },

  deleteCategory: async (id) => {
    const { data } = await axiosInstance.delete(`/categories/${id}`);
    return data;
  },
};
