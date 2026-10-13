package com.ps.backend.user_service.service.impl;

import com.ps.backend.notification_service.service.EmailService;
import com.ps.backend.user_service.model.dto.*;
import com.ps.backend.user_service.model.entity.Users;
import com.ps.backend.user_service.model.mapper.UserDTOMapper;
import com.ps.backend.user_service.repository.UserRepo;
import com.ps.backend.user_service.service.UserService;
import com.ps.backend.util.CustomUserDetails;
import com.ps.backend.util.JWTUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    @Value("${APPLICATION_PORT}")
    private String PORT;

    private final UserRepo userRepo;
    private final BCryptPasswordEncoder encoder;
    private final EmailService emailService;
    private final AuthenticationManager authenticationManager;
    private final JWTUtil jwtUtil;

    @Override
    @Transactional
    public Boolean signUp(UserRequestDTO requestDTO) {
        if(userRepo.existsByEmail(requestDTO.getEmail()) || userRepo.existsByPhoneNumber(requestDTO.getPhoneNumber())){
            throw new RuntimeException("User Already Present");
        }
        Users user = UserDTOMapper.toEntity(requestDTO);
        user.setPassword(encoder.encode(requestDTO.getPassword()));
        user.setActivationToken(UUID.randomUUID().toString());
        user.setActivationExpiration(LocalDateTime.now().plusMinutes(15));
        Users savedUser = userRepo.save(user);
        sendActivationLink(savedUser.getUserId());
        return true;
    }

    @Override
    public LoginResponseDTO login(LoginRequestDTO requestDTO) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(requestDTO.email(), requestDTO.password()));
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        if (userDetails == null) {
            throw new RuntimeException("Some Error Occurred");
        } else if (!userDetails.isEnabled()) {
            throw new RuntimeException("Please Activate Account Before Logging");
        }
        return new LoginResponseDTO(UserDTOMapper.toDTO(userDetails.getUser()), jwtUtil.generateAccessToken(userDetails.getUser()), jwtUtil.generateRefreshToken(userDetails.getUser()));
    }

    @Override
    public UserResponseDTO getMe() {
        return null;
    }

    @Override
    public Boolean activateProfile(String activationToken) {
        return null;
    }

    @Override
    public Boolean sendOTP(String email) {
        return null;
    }

    @Override
    public Boolean uploadProfilePic(UUID userId, MultipartFile file) {
        return null;
    }

    @Override
    public String updateUser(UserRequestDTO requestDTO) {
        return "";
    }

    @Override
    public String updatePassword(UpdatePasswordDTO requestDTO) {
        return "";
    }

    @Override
    public String verifyOTP(String email, String OTP) {
        return "";
    }

    @Override
    public String resetPassword(String email, UpdatePasswordDTO requestDTO) {
        return "";
    }

    @Override
    public Boolean sendActivationLink(UUID userId) {
        Users user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not Found"));
        String activationToken = user.getActivationToken();
        if(user.getActivationExpiration().isBefore(LocalDateTime.now())){
            activationToken = UUID.randomUUID().toString();
            user.setActivationToken(activationToken);
            user.setActivationExpiration(LocalDateTime.now().plusMinutes(15));
            userRepo.save(user);
        }
        String activationLink = "http://localhost:"+PORT+"/api/user/activate?token=" + activationToken;
        String to = user.getEmail();
        String subject = "Profile Activation Link";
        String body = """
                Hi %s,
                Welcome to MoneyManager! Please activate your account by clicking the link below:
                %s
                If you didn't create this account, you can safely ignore this email.
                """.formatted(user.getFirstName(), activationLink);
        return emailService.sendEmail(to, subject, body);
    }

    @Override
    public Boolean logout(HttpServletRequest request) {
        return null;
    }
}
