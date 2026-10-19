package com.ps.backend.user_service.model.dto;

public record LoginResponseDTO(UserResponseDTO userResponseDTO,String accessToken,String refreshToken) {
}
