package com.ps.backend.user_service.controller;

import com.ps.backend.user_service.model.dto.UpdatePasswordDTO;
import com.ps.backend.user_service.model.dto.UserRequestDTO;
import com.ps.backend.user_service.model.dto.UserResponseDTO;
import com.ps.backend.user_service.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/getme")
    public ResponseEntity<UserResponseDTO> getMe(){
        return ResponseEntity.status(HttpStatus.OK).body(userService.getMe());
    }

    @PostMapping("/activate")
    public ResponseEntity<Boolean> activateProfile(@RequestParam String token){
        return ResponseEntity.status(HttpStatus.OK).body(userService.activateProfile(token));
    }

    @PostMapping("/send-otp")
    public ResponseEntity<Boolean> sendOTP(@RequestParam String email){
        return ResponseEntity.ok().body(userService.sendOTP(email));
    }

    @PatchMapping("/uploadPic/{userId}")
    public ResponseEntity<Boolean> uploadProfilePic(@PathVariable UUID userId, @RequestParam MultipartFile file){
        return ResponseEntity.ok().body(userService.uploadProfilePic(userId,file));
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateUser(@RequestBody UserRequestDTO requestDTO){
        return ResponseEntity.ok().body(userService.updateUser(requestDTO));
    }

    @PutMapping("/udpatePassword")
    public ResponseEntity<String> updatePassword(@RequestBody UpdatePasswordDTO passwordDTO){
        return ResponseEntity.ok().body(userService.updatePassword(passwordDTO));
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<String> verifyOTP(@RequestParam String email,@RequestParam String OTP){
        return ResponseEntity.ok().body(userService.verifyOTP(email,OTP));
    }

    @PutMapping("resetPassword")
    public ResponseEntity<String> resetPassword(@RequestParam String email,@RequestBody UpdatePasswordDTO requestDTO){
        return ResponseEntity.ok().body(userService.resetPassword(email,requestDTO));
    }

}
