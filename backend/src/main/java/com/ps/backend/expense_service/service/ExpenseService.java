package com.ps.backend.expense_service.service;

import com.ps.backend.expense_service.model.dto.ExpenseRequestDTO;
import com.ps.backend.expense_service.model.dto.ExpenseResponseDTO;

import java.util.List;
import java.util.UUID;

public interface ExpenseService {
    ExpenseResponseDTO addExpense(ExpenseRequestDTO requestDTO);
//    ExpenseResponseDTO updateExpense(Long expenseId,ExpenseRequestDTO requestDTO);
    Boolean deleteExpense(Long expenseId);
    List<ExpenseResponseDTO> getAllByUserId(UUID userId);
    List<ExpenseResponseDTO> getAllByUserIdAndCategoryId(UUID userId, Long categoryId);
}
