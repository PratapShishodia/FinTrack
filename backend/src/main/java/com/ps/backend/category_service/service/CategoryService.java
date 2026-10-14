package com.ps.backend.category_service.service;

import com.ps.backend.category_service.model.dto.CategoryRequestDTO;
import com.ps.backend.category_service.model.dto.CategoryResponseDTO;
import com.ps.backend.common.enums.CATEGORY_TYPE;

import java.util.List;

public interface CategoryService {
    List<CategoryResponseDTO> getAllCategory();
    List<CategoryResponseDTO> getAllCategoryByCategoryType(CATEGORY_TYPE type);
    Boolean addCategory(CategoryRequestDTO requestDTO);
    Boolean updateCategory(Long categoryId, CategoryRequestDTO requestDTO);
    Boolean deleteCategory(Long categoryId);
}
