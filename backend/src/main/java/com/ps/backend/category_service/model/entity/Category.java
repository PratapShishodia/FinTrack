package com.ps.backend.category_service.model.entity;

import com.ps.backend.common.enums.CATEGORY_TYPE;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class Category{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long categoryId;
    @Column(nullable = false,unique = true)
    private String categoryName;
    @Column(nullable = false)
    private String icon;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private CATEGORY_TYPE categoryType;
}
