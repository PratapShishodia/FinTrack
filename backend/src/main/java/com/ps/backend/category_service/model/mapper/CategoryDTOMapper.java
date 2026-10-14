package com.ps.backend.category_service.model.mapper;

import com.ps.backend.category_service.model.dto.CategoryRequestDTO;
import com.ps.backend.category_service.model.dto.CategoryResponseDTO;
import com.ps.backend.category_service.model.entity.Category;

public class CategoryDTOMapper {

    public static CategoryResponseDTO toDTO(Category category){
        return CategoryResponseDTO.builder()
                .categoryId(category.getCategoryId())
                .categoryName(category.getCategoryName())
                .icon(category.getIcon())
                .categoryType(category.getCategoryType())
                .build();
    }

    public static Category toEntity(CategoryRequestDTO requestDTO){
        return Category.builder()
                .categoryName(requestDTO.getCategoryName())
                .icon(requestDTO.getIcon())
                .categoryType(requestDTO.getCategoryType())
                .build();
    }
}
