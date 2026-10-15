package com.ps.backend.expense_service.controller;

import com.ps.backend.expense_service.model.dto.ExpenseRequestDTO;
import com.ps.backend.expense_service.model.dto.ExpenseResponseDTO;
import com.ps.backend.expense_service.service.ExpenseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/expense")
@RequiredArgsConstructor
public class ExpenseController {

    private final ExpenseService expenseService;

    @PostMapping()
    public ResponseEntity<ExpenseResponseDTO> addExpense(@RequestBody ExpenseRequestDTO requestDTO){
        return ResponseEntity.status(HttpStatus.CREATED).body(expenseService.addExpense(requestDTO));
    }
    @DeleteMapping("/{expenseId}")
    public ResponseEntity<Boolean> addExpense(@PathVariable Long expenseId){
        return ResponseEntity.status(HttpStatus.OK).body(expenseService.deleteExpense(expenseId));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<ExpenseResponseDTO>> getAllByUserId(@PathVariable UUID userId){
        return ResponseEntity.ok(expenseService.getAllByUserId(userId));
    }

    @GetMapping("/{userId}}")
    public ResponseEntity<List<ExpenseResponseDTO>> getAllByUserId(@PathVariable UUID userId, @RequestParam Long categoryId){
        return ResponseEntity.ok(expenseService.getAllByUserIdAndCategoryId(userId,categoryId));
    }
}
