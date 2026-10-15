package com.ps.backend.expense_service.repository;

import com.ps.backend.expense_service.model.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ExpenseRepo extends JpaRepository<Expense,Long> {
    List<Expense> findByUserId(UUID userId);
    List<Expense> findByUserIdAndCategoryId(UUID userId, Long categoryId);
}
