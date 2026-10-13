package com.ps.backend.user_service.service;

import com.ps.backend.user_service.model.dto.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

public interface UserService {
    Boolean signUp(UserRequestDTO requestDTO);
    LoginResponseDTO login(LoginRequestDTO requestDTO);
    UserResponseDTO getMe();
    Boolean activateProfile(String activationToken);
    Boolean sendOTP(String email);
    Boolean uploadProfilePic(UUID userId, MultipartFile file);
    String updateUser(UserRequestDTO requestDTO);
    String updatePassword(UpdatePasswordDTO requestDTO);
    String verifyOTP(String email, String OTP);
    String resetPassword(String email, UpdatePasswordDTO requestDTO);
    Boolean sendActivationLink(UUID userId);
    Boolean logout(HttpServletRequest request);
}
