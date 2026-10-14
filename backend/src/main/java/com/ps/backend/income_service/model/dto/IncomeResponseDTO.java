package com.ps.backend.income_service.model.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class IncomeResponseDTO {
    private Long incomeId;
    private String name;
    private BigDecimal amount;
    private Long categoryId;
    private LocalDate date;
    private String icon;
}
