package com.ps.backend.category_service.service.impl;

import com.ps.backend.category_service.model.dto.CategoryRequestDTO;
import com.ps.backend.category_service.model.dto.CategoryResponseDTO;
import com.ps.backend.category_service.model.entity.Category;
import com.ps.backend.category_service.model.mapper.CategoryDTOMapper;
import com.ps.backend.category_service.repository.CategoryRepo;
import com.ps.backend.category_service.service.CategoryService;
import com.ps.backend.common.enums.CATEGORY_TYPE;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepo categoryRepo;

    @Override
    public List<CategoryResponseDTO> getAllCategory() {
        List<Category> categoryList = categoryRepo.findAll();
        return categoryList.stream().map(CategoryDTOMapper::toDTO).toList();
    }

    @Override
    public List<CategoryResponseDTO> getAllCategoryByCategoryType(CATEGORY_TYPE type) {
        List<Category> categoryList = categoryRepo.findByCategoryType(type);
        return categoryList.stream().map(CategoryDTOMapper::toDTO).toList();
    }

    @Override
    @Transactional
    public Boolean addCategory(CategoryRequestDTO requestDTO) {
        if(categoryRepo.existsByCategoryName(requestDTO.getCategoryName())){
            throw new RuntimeException("Category Already Exist");
        }
        Category category = CategoryDTOMapper.toEntity(requestDTO);
        categoryRepo.save(category);
        return true;
    }

    @Override
    @Transactional
    public Boolean updateCategory(Long categoryId, CategoryRequestDTO requestDTO) {
        Category category = categoryRepo.findById(categoryId).orElseThrow(()-> new RuntimeException("Category Not Found"));
        if(requestDTO.getCategoryName() != null){
            category.setCategoryName(requestDTO.getCategoryName());
        }
        if(requestDTO.getCategoryType() != null){
            category.setCategoryType(requestDTO.getCategoryType());
        }
        if(requestDTO.getIcon() != null){
            category.setIcon(requestDTO.getIcon());
        }
        categoryRepo.save(category);
        return true;
    }

    @Override
    public Boolean deleteCategory(Long categoryId) {
        Category category = categoryRepo.findById(categoryId).orElseThrow(()-> new RuntimeException("Category Not Found"));
        categoryRepo.delete(category);
        return true;
    }
}
