package com.ps.backend.expense_service.model.mapper;

import com.ps.backend.expense_service.model.dto.ExpenseRequestDTO;
import com.ps.backend.expense_service.model.dto.ExpenseResponseDTO;
import com.ps.backend.expense_service.model.entity.Expense;

public class ExpenseDTOMapper {
    public static ExpenseResponseDTO toDTO(Expense Expense){
        return ExpenseResponseDTO.builder()
                .expenseId(Expense.getExpenseId())
                .name(Expense.getName())
                .amount(Expense.getAmount())
                .userId(Expense.getUserId())
                .categoryId(Expense.getCategoryId())
                .date(Expense.getDate())
                .icon(Expense.getIcon())
                .build();
    }

    public static Expense toEntity(ExpenseRequestDTO requestDTO){
        return Expense.builder()
                .name(requestDTO.getName())
                .amount(requestDTO.getAmount())
                .userId(requestDTO.getUserId())
                .categoryId(requestDTO.getCategoryId())
                .icon(requestDTO.getIcon())
                .build();
    }
}
