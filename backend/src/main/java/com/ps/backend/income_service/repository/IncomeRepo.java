package com.ps.backend.income_service.repository;

import com.ps.backend.income_service.model.entity.Income;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface IncomeRepo extends JpaRepository<Income,Long> {
    List<Income> findByUserId(UUID userId);
    List<Income> findByUserIdAndCategoryId(UUID userId,Long categoryId);
}
