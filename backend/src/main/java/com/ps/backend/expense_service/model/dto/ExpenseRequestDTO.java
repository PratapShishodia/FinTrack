package com.ps.backend.expense_service.model.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class ExpenseRequestDTO {
    private String name;
    private BigDecimal amount;
    private UUID userId;
    private Long categoryId;
    private LocalDate date;
    private String icon;
}
