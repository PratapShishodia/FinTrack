package com.ps.backend.income_service.model.mapper;

import com.ps.backend.income_service.model.dto.IncomeRequestDTO;
import com.ps.backend.income_service.model.dto.IncomeResponseDTO;
import com.ps.backend.income_service.model.entity.Income;

public class IncomeDTOMapper {
    public static IncomeResponseDTO toDTO(Income income){
        return IncomeResponseDTO.builder()
                .incomeId(income.getIncomeId())
                .name(income.getName())
                .amount(income.getAmount())
                .userId(income.getUserId())
                .categoryId(income.getCategoryId())
                .date(income.getDate())
                .icon(income.getIcon())
                .build();
    }

    public static Income toEntity(IncomeRequestDTO requestDTO){
        return Income.builder()
                .name(requestDTO.getName())
                .amount(requestDTO.getAmount())
                .userId(requestDTO.getUserId())
                .categoryId(requestDTO.getCategoryId())
                .icon(requestDTO.getIcon())
                .build();
    }
}
