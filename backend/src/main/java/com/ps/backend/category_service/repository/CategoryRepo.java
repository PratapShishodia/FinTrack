package com.ps.backend.category_service.repository;

import com.ps.backend.category_service.model.entity.Category;
import com.ps.backend.common.enums.CATEGORY_TYPE;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepo extends JpaRepository<Category,Long> {
    Boolean existsByCategoryName(String name);
    List<Category> findByCategoryType(CATEGORY_TYPE categoryType);
}
