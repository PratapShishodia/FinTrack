package com.ps.backend.user_service.repository;

import com.ps.backend.user_service.model.entity.RefreshTokenEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface RefreshRepo extends JpaRepository<RefreshTokenEntity, UUID> {
    RefreshTokenEntity findByUserId(UUID userId);
    RefreshTokenEntity findByRefreshToken(String refreshToken);
}
