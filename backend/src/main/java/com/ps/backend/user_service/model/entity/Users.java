package com.ps.backend.user_service.model.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Users {
    @Id
    private UUID userId;
    @Column(nullable = false)
    private String firstName;
    private String lastName;
    @Column(nullable = false,unique = true)
    private String email;
    @Column(nullable = false,unique = true)
    private String phoneNumber;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false)
    private String profilePic;
    private String activationToken;
    private LocalDateTime activationExpiration;
    private String OTP;
    private Boolean isOTPVerified;
    private Boolean isActive;
    private LocalDateTime OTPExpiration;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate(){
        this.userId = UUID.randomUUID();
        this.createdAt = LocalDateTime.now();
        this.isActive = true;
        this.isOTPVerified = true;
    }

    @PreUpdate
    protected void onUpdate(){
        this.updatedAt = LocalDateTime.now();
    }
}
