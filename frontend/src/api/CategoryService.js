import axiosInstance from "./axiosInstance";

// Category Service
export const getCategories = async() => {
  const response = await axiosInstance.get(`/category`);
  return response.data;
}

export const getCategoriesByType = async(type) => {
  const response = await axiosInstance.get(`/category/${type}`);
  return response.data;
}

export const createCategory = async(categoryDTO) => {
  const response = await axiosInstance.post(`/category`, categoryDTO);
  return response.data;
}

export const updateCategory = async(categoryId, categoryDTO) => {
  const response = await axiosInstance.put(`/category`, categoryDTO, {
    params: { categoryId },
  });
  return response.data;
}

export const deleteCategory = async(categoryId) => {
  const response = await axiosInstance.delete(`/category`, {
    params: { categoryId },
  });
  return response.data;
}