package com.ps.backend.user_service.model.mapper;

import com.ps.backend.user_service.model.dto.UserRequestDTO;
import com.ps.backend.user_service.model.dto.UserResponseDTO;
import com.ps.backend.user_service.model.entity.Users;

public class UserDTOMapper {

    public static UserResponseDTO toDTO(Users user){
        return UserResponseDTO.builder()
                .userId(user.getUserId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .profilePic(user.getProfilePic())
                .build();
    }

    public static Users toEntity(UserRequestDTO requestDTO){
        return Users.builder()
                .firstName(requestDTO.getFirstName())
                .lastName(requestDTO.getLastName())
                .email(requestDTO.getEmail())
                .phoneNumber(requestDTO.getPhoneNumber())
                .profilePic(requestDTO.getProfilePic())
                .build();
    }
}
