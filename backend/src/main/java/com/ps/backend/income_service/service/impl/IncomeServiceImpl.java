package com.ps.backend.income_service.service.impl;

import com.ps.backend.income_service.model.dto.IncomeRequestDTO;
import com.ps.backend.income_service.model.dto.IncomeResponseDTO;
import com.ps.backend.income_service.model.entity.Income;
import com.ps.backend.income_service.model.mapper.IncomeDTOMapper;
import com.ps.backend.income_service.repository.IncomeRepo;
import com.ps.backend.income_service.service.IncomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class IncomeServiceImpl implements IncomeService {

    private final IncomeRepo incomeRepo;

    @Override
    public IncomeResponseDTO addIncome(IncomeRequestDTO requestDTO) {
        Income income = IncomeDTOMapper.toEntity(requestDTO);
        return IncomeDTOMapper.toDTO(incomeRepo.save(income));
    }
//
//    @Override
//    public IncomeResponseDTO updateIncome(Long incomeId, IncomeRequestDTO requestDTO) {
//        return null;
//    }

    @Override
    public Boolean deleteIncome(Long incomeId) {
        Income income = incomeRepo.findById(incomeId).orElseThrow(()-> new RuntimeException("Income Not Found"));
        incomeRepo.delete(income);
        return true;
    }

    @Override
    public List<IncomeResponseDTO> getAllByUserId(UUID userId) {
        List<Income> incomeList = incomeRepo.findByUserId(userId);
        return incomeList.stream().map(IncomeDTOMapper::toDTO).toList();
    }

    @Override
    public List<IncomeResponseDTO> getAllByUserIdAndCategoryId(UUID userId, Long categoryId) {
        List<Income> incomeList = incomeRepo.findByUserIdAndCategoryId(userId,categoryId);
        return incomeList.stream().map(IncomeDTOMapper::toDTO).toList();
    }
}
