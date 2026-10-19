import axiosInstance from "./axiosInstance";

export const createIncome = async(incomeDTO) => {
  const response = await axiosInstance.post(`/income`, incomeDTO);
  return response.data;
}

export const deleteIncome = async(incomeId) => {
  const response = await axiosInstance.delete(`/income/${incomeId}`);
  return response.data;
}

export const getIncomeByUserId = async(userId) => {
  const response = await axiosInstance.get(`/income/${userId}`);
  return response.data;
}

export const getIncomeByCategory = async(userId, categoryId) => {
  const response = await axiosInstance.get(`/income/category/${userId}`, {
    params: { categoryId },
  });
  return response.data;
}