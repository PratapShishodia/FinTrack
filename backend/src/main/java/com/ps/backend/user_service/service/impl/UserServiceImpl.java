package com.ps.backend.user_service.service.impl;

import com.ps.backend.notification_service.service.EmailService;
import com.ps.backend.user_service.model.dto.*;
import com.ps.backend.user_service.model.entity.RefreshTokenEntity;
import com.ps.backend.user_service.model.entity.Users;
import com.ps.backend.user_service.model.mapper.UserDTOMapper;
import com.ps.backend.user_service.repository.RefreshRepo;
import com.ps.backend.user_service.repository.UserRepo;
import com.ps.backend.user_service.service.UserService;
import com.ps.backend.util.CustomUserDetails;
import com.ps.backend.util.JWTUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    @Value("${APPLICATION_PORT}")
    private String PORT;


    private final String UPLOAD_DIR = System.getProperty("user.dir")+"/uploads/Imgs/";
    private final UserRepo userRepo;
    private final RefreshRepo refreshRepo;
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
        String refreshToken = jwtUtil.generateRefreshToken(userDetails.getUser());
        RefreshTokenEntity refreshTokenEntity = RefreshTokenEntity.builder()
                .userId(userDetails.getUser().getUserId())
                .refreshToken(refreshToken)
                .isActive(true)
                .build();
        refreshRepo.save(refreshTokenEntity);
        return new LoginResponseDTO(UserDTOMapper.toDTO(userDetails.getUser()), jwtUtil.generateAccessToken(userDetails.getUser()), refreshToken);
    }

    @Override
    public UserResponseDTO getMe() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        return UserDTOMapper.toDTO(userDetails.getUser());
    }

    @Override
    @Transactional
    public Boolean activateProfile(String activationToken) {
        Users user = userRepo.findByActivationToken(activationToken).orElseThrow(()-> new RuntimeException("User Not Found"));
        if(user.getActivationExpiration().isBefore(LocalDateTime.now())){
            throw new RuntimeException("Activation Token is Expired");
        }
        user.setActivationExpiration(null);
        user.setActivationToken("");
        user.setIsActive(true);
        userRepo.save(user);
        return true;
    }

    @Override
    @Transactional
    public Boolean sendOTP(String email) {
        Users user = userRepo.findByEmail(email);
        String OTP = String.valueOf(100000 + new SecureRandom().nextInt(900000));
        user.setOTP(OTP);
        user.setOTPExpiration(LocalDateTime.now().plusMinutes(15));
        user.setIsOTPVerified(false);
        userRepo.save(user);
        String subject = "Forget Password";
        String body = "Your OTP to reset your password is <b>" + OTP + "</b>. It is valid for 15 minutes.<br><br>If you didn't request this, please ignore this email.";
        return emailService.sendEmail(email, subject, body);
    }

    @Override
    @Transactional
    @SneakyThrows
    public Boolean uploadProfilePic(UUID userId, MultipartFile file) {
        long MAX_SIZE = 2*1024*1024;
        List<String> ALLOWED_TYPES = List.of("image/jpeg","image/png","image/jpg");
        List<String> ALLOWED_EXTENSIONS = List.of("jpeg","png","jpg");
        Users user = userRepo.findById(userId).orElseThrow(()-> new RuntimeException("Restaurant not Found"));
        if(file.isEmpty()){
            throw new RuntimeException("File is Empty");
        }
        if(file.getSize() > MAX_SIZE){
            throw new RuntimeException("File Size should not more than 2MB");
        }
        System.out.println("FILE TYPE: "+file.getContentType());
        System.out.println(ALLOWED_TYPES.contains(file.getContentType()));
        if(!ALLOWED_TYPES.contains(file.getContentType())){
            throw new RuntimeException("File Should be of type jpeg,jpg,png");
        }
        String originalName = file.getOriginalFilename();
        if(originalName == null || !originalName.contains(".")){
            throw new RuntimeException("Invalid File Name");
        }
        String extension = originalName.substring(originalName.lastIndexOf(".")+1);
        System.out.println("EXTENSION:"+extension);
        if(!ALLOWED_EXTENSIONS.contains(extension)){
            throw new RuntimeException("File Should be of .jpeg,.jpg,.png");
        }

        File folder = new File(UPLOAD_DIR);
        if(!folder.exists()){
            if(!folder.mkdirs()){
                throw new RuntimeException("Some Error Occurred");
            }
        }
        String fileName = userId+"."+extension;
        Path filePath = Paths.get(UPLOAD_DIR+fileName);
        System.out.println("Path: "+filePath.toString());
        Files.write(filePath,file.getBytes());
        String imageURL = UPLOAD_DIR+"/products/images/"+fileName;
        user.setProfilePic(imageURL);
        userRepo.save(user);
        return true;
    }

    @Override
    @Transactional
    public String updateUser(UserRequestDTO requestDTO) {
        CustomUserDetails userDetails = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Users updatedUser = null;
        if (userDetails != null) {
            Users user = userDetails.getUser();
            if (userRepo.existsByEmailAndUserIdNot(requestDTO.getEmail(), user.getUserId())) {
                throw new RuntimeException("Email ID already registered");
            }
            if (requestDTO.getFirstName() != null && !Objects.equals(user.getFirstName(), requestDTO.getFirstName())) {
                System.out.println("Update First Name");
                user.setFirstName(requestDTO.getFirstName());
            }
            if (requestDTO.getLastName() != null && !Objects.equals(user.getLastName(), requestDTO.getLastName())) {
                System.out.println("Update Last Name");
                user.setLastName(requestDTO.getLastName());
            }
            if (requestDTO.getEmail() != null && !Objects.equals(user.getEmail(), requestDTO.getEmail())) {
                System.out.println("Update Email");
                user.setEmail(requestDTO.getEmail());
            }
            updatedUser = userRepo.save(user);
        }
        if (updatedUser == null) {
            throw new RuntimeException("Unable to Update");
        }
        return "Updated Successfully";
    }

    @Override
    @Transactional
    public String updatePassword(UpdatePasswordDTO requestDTO) {
        CustomUserDetails userDetails = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (userDetails != null) {
            Users user = userDetails.getUser();
            if (!encoder.matches(requestDTO.oldPassword(), user.getPassword())) {
                throw new RuntimeException("Old Password do not match");
            }
            user.setPassword(encoder.encode(requestDTO.newPassword()));
            userRepo.save(user);
            return "Password Updated Successfully";
        }
        return "Password Update Failed";
    }

    @Override
    @Transactional
    public String verifyOTP(String email, String OTP) {
        Users user = userRepo.findByEmail(email);

        if (user.getOTP() == null) {
            throw new RuntimeException("Something Went Wrong!");
        }

        if (!user.getOTP().equals(OTP))
            throw new RuntimeException("Invalid OTP");

        if (user.getOTPExpiration().isBefore(LocalDateTime.now()))
            throw new RuntimeException("OTP expired");

        user.setIsOTPVerified(true);

        userRepo.save(user);
        return "OTP Verified";
    }

    @Override
    @Transactional
    public String resetPassword(String email, UpdatePasswordDTO requestDTO) {
        Users user = userRepo.findByEmail(email);

        if (!user.getIsOTPVerified())
            throw new RuntimeException("OTP verification required");

        user.setPassword(encoder.encode(requestDTO.newPassword()));

        user.setOTP(null);
        user.setOTPExpiration(null);
        user.setIsOTPVerified(false);

        userRepo.save(user);
        return "Password Updated Successfully";
    }

    @Override
    @Transactional
    public void sendActivationLink(UUID userId) {
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
                Welcome to FinTrack! Please activate your account by clicking the link below:
                %s
                If you didn't create this account, you can safely ignore this email.
                """.formatted(user.getFirstName(), activationLink);
        emailService.sendEmail(to, subject, body);
    }

    @Override
    public Boolean logout(HttpServletRequest request) {
        SecurityContextHolder.clearContext();

        if (request.getSession(false) != null) {
            request.getSession(false).invalidate();
        }
        return true;
    }
}
