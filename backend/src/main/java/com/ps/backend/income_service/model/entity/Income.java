package com.ps.backend.income_service.model.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Income {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long incomeId;
    private String name;
    private UUID userId;
    private BigDecimal amount;
    private Long categoryId;
    private LocalDate date;
    private String icon;

    @PrePersist
    protected void onCreate(){
        this.date = LocalDate.now();
    }
}
