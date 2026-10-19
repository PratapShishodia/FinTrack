package com.ps.backend.category_service.controller;

import com.ps.backend.category_service.model.dto.CategoryRequestDTO;
import com.ps.backend.category_service.model.dto.CategoryResponseDTO;
import com.ps.backend.category_service.service.CategoryService;
import com.ps.backend.common.enums.CATEGORY_TYPE;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/category")
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping()
    public ResponseEntity<List<CategoryResponseDTO>> getAllCategory(){
        return ResponseEntity.ok().body(categoryService.getAllCategory());
    }

    @GetMapping("/{type}")
    public ResponseEntity<List<CategoryResponseDTO>> getAllCategoryByType(@PathVariable CATEGORY_TYPE type){
        return ResponseEntity.ok().body(categoryService.getAllCategoryByCategoryType(type));
    }

    @PostMapping()
    public ResponseEntity<Boolean> addCategory(@RequestBody CategoryRequestDTO requestDTO){
        return ResponseEntity.ok().body(categoryService.addCategory(requestDTO));
    }

    @PutMapping()
    public ResponseEntity<Boolean> updateCategory(@RequestParam Long categoryId,@RequestBody CategoryRequestDTO requestDTO){
        return ResponseEntity.ok().body(categoryService.updateCategory(categoryId,requestDTO));
    }

    @DeleteMapping()
    public ResponseEntity<Boolean> deleteCategory(@RequestParam Long categoryId){
        return ResponseEntity.ok().body(categoryService.deleteCategory(categoryId));
    }
}
