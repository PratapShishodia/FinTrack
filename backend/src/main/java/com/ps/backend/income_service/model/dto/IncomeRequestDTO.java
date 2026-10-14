package com.ps.backend.income_service.model.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class IncomeRequestDTO {
    private String name;
    private BigDecimal amount;
    private Long categoryId;
    private LocalDate date;
    private String icon;
}
