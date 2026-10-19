package com.ps.backend.user_service.controller;

import com.ps.backend.user_service.model.dto.LoginRequestDTO;
import com.ps.backend.user_service.model.dto.LoginResponseDTO;
import com.ps.backend.user_service.model.dto.UserRequestDTO;
import com.ps.backend.user_service.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<Boolean> signup(@RequestBody UserRequestDTO requestDTO){
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.signUp(requestDTO));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO requestDTO){
        return ResponseEntity.status(HttpStatus.OK).body(userService.login(requestDTO));
    }

    @PutMapping("/logout")
    public ResponseEntity<Boolean> logout(HttpServletRequest request){
        return ResponseEntity.ok().body(userService.logout(request));
    }
}
