package com.ps.backend.expense_service.model.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ExpenseResponseDTO {
    private Long expenseId;
    private String name;
    private UUID userId;
    private BigDecimal amount;
    private Long categoryId;
    private LocalDate date;
    private String icon;
}
