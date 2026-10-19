import axiosInstance from "./axiosInstance";

export const createExpense = async(expenseDTO) => {
  const response = await axiosInstance.post(`/expense`, expenseDTO);
  return response.data;
}

export const deleteExpense = async(expenseId) => {
  const response = await axiosInstance.delete(`/expense/${expenseId}`);
  return response.data;
}

export const getExpensesByUserId = async(userId) => {
  const response = await axiosInstance.get(`/expense/${userId}`);
  return response.data;
}

export const getExpensesByCategory = async(userId, categoryId) => {
  const response = await axiosInstance.get(`/expense/category/${userId}`, {
    params: { categoryId },
  });
  return response.data;
}