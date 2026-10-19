import axiosInstance from "./axiosInstance";

// Authentication Service
export const login = async(loginDTO) => {
  const response = await axiosInstance.post(`/auth/login`, loginDTO);
  return response.data;
}

export const signup = async(signupDTO) => {
  const response = await axiosInstance.post(`/auth/signup`, signupDTO);
  return response.data;
}

export const logout = async() => {
  const response = await axiosInstance.put(`/auth/logout`);
  return response.data;
}