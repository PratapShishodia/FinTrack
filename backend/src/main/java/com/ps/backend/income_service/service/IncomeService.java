package com.ps.backend.income_service.service;

import com.ps.backend.income_service.model.dto.IncomeRequestDTO;
import com.ps.backend.income_service.model.dto.IncomeResponseDTO;

import java.util.List;
import java.util.UUID;

public interface IncomeService {
    IncomeResponseDTO addIncome(IncomeRequestDTO requestDTO);
//    IncomeResponseDTO updateIncome(Long incomeId,IncomeRequestDTO requestDTO);
    Boolean deleteIncome(Long incomeId);
    List<IncomeResponseDTO> getAllByUserId(UUID userId);
    List<IncomeResponseDTO> getAllByUserIdAndCategoryId(UUID userId,Long categoryId);
}
