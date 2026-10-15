package com.ps.backend.expense_service.service.impl;

import com.ps.backend.expense_service.model.dto.ExpenseRequestDTO;
import com.ps.backend.expense_service.model.dto.ExpenseResponseDTO;
import com.ps.backend.expense_service.model.entity.Expense;
import com.ps.backend.expense_service.model.mapper.ExpenseDTOMapper;
import com.ps.backend.expense_service.repository.ExpenseRepo;
import com.ps.backend.expense_service.service.ExpenseService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ExpenseServiceImpl implements ExpenseService {

    private final ExpenseRepo ExpenseRepo;

    @Override
    public ExpenseResponseDTO addExpense(ExpenseRequestDTO requestDTO) {
        Expense Expense = ExpenseDTOMapper.toEntity(requestDTO);
        return ExpenseDTOMapper.toDTO(ExpenseRepo.save(Expense));
    }
//
//    @Override
//    public ExpenseResponseDTO updateExpense(Long ExpenseId, ExpenseRequestDTO requestDTO) {
//        return null;
//    }

    @Override
    public Boolean deleteExpense(Long ExpenseId) {
        Expense Expense = ExpenseRepo.findById(ExpenseId).orElseThrow(()-> new RuntimeException("Expense Not Found"));
        ExpenseRepo.delete(Expense);
        return true;
    }

    @Override
    public List<ExpenseResponseDTO> getAllByUserId(UUID userId) {
        List<Expense> ExpenseList = ExpenseRepo.findByUserId(userId);
        return ExpenseList.stream().map(ExpenseDTOMapper::toDTO).toList();
    }

    @Override
    public List<ExpenseResponseDTO> getAllByUserIdAndCategoryId(UUID userId, Long categoryId) {
        List<Expense> ExpenseList = ExpenseRepo.findByUserIdAndCategoryId(userId,categoryId);
        return ExpenseList.stream().map(ExpenseDTOMapper::toDTO).toList();
    }
}
