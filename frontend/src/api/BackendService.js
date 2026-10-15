import axiosInstance from "./axiosInstance";

export const login = async () => {
  const response = await axiosInstance.get("/products");

  return response.data;
};
export const createProduct = async (newProduct) => {
  const response = await axiosInstance.post("/products", newProduct);

  return response.data;
};
