import axiosInstance from "./axiosInstance";

export const getMe = async() => {
  const response = await axiosInstance.get(`/user/getme`);
  return response.data;
}

export const activateUser = async(token) => {
  const response = await axiosInstance.post(`/user/activate`, null, {
    params: { token },
  });
  return response.data;
}

export const sendOtp = async(email) => {
  const response = await axiosInstance.post(`/user/send-otp`, null, {
    params: { email },
  });
  return response.data;
}

export const uploadProfilePicture = async(userId, file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axiosInstance.patch(`/user/uploadPic/${userId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}

export const updateUser = async(userDTO) => {
  const response = await axiosInstance.put(`/user/update`, userDTO);
  return response.data;
}

export const updatePassword = async(passwordDTO) => {
  const response = await axiosInstance.put(`/user/udpatePassword`, passwordDTO);
  return response.data;
}

export const verifyOtp = async(email, OTP) => {
  const response = await axiosInstance.post(`/user/verify-otp`, null, {
    params: { email, OTP },
  });
  return response.data;
}

export const resetPassword = async(email, passwordDTO) => {
  const response = await axiosInstance.put(`/user/resetPassword`, passwordDTO, {
    params: { email },
  });
  return response.data;
}
