package com.ps.backend.user_service.repository;

import com.ps.backend.user_service.model.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepo extends JpaRepository<Users, UUID> {
    Boolean existsByPhoneNumber(String phoneNumber);
    Boolean existsByEmail(String email);
    Users findByEmail(String email);
    Optional<Users> findByActivationToken(String token);
    Boolean existsByEmailAndUserIdNot(String email, UUID userId);
}
