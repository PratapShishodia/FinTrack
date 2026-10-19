package com.ps.backend.user_service.model.dto;

public record UpdatePasswordDTO(String oldPassword, String newPassword) {
}