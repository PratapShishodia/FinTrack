package com.ps.backend.category_service.model.dto;

import com.ps.backend.common.enums.CATEGORY_TYPE;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class CategoryRequestDTO {
    private String categoryName;
    private String icon;
    private CATEGORY_TYPE categoryType;
}
