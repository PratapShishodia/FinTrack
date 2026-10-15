package com.ps.backend.income_service.controller;

import com.ps.backend.income_service.model.dto.IncomeRequestDTO;
import com.ps.backend.income_service.model.dto.IncomeResponseDTO;
import com.ps.backend.income_service.service.IncomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/income")
@RequiredArgsConstructor
public class IncomeController {

    private final IncomeService incomeService;

    @PostMapping()
    public ResponseEntity<IncomeResponseDTO> addIncome(@RequestBody IncomeRequestDTO requestDTO){
        return ResponseEntity.status(HttpStatus.CREATED).body(incomeService.addIncome(requestDTO));
    }
    @DeleteMapping("/{incomeId}")
    public ResponseEntity<Boolean> addIncome(@PathVariable Long incomeId){
        return ResponseEntity.status(HttpStatus.OK).body(incomeService.deleteIncome(incomeId));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<IncomeResponseDTO>> getAllByUserId(@PathVariable UUID userId){
        return ResponseEntity.ok(incomeService.getAllByUserId(userId));
    }

    @GetMapping("/category/{userId}")
    public ResponseEntity<List<IncomeResponseDTO>> getAllByUserId(@PathVariable UUID userId,@RequestParam Long categoryId){
        return ResponseEntity.ok(incomeService.getAllByUserIdAndCategoryId(userId,categoryId));
    }
}
