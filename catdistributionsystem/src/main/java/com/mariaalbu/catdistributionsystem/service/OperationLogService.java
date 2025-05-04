package com.mariaalbu.catdistributionsystem.service;

import com.mariaalbu.catdistributionsystem.model.OperationLog;
import com.mariaalbu.catdistributionsystem.repository.IOperationLogRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OperationLogService {
    private final IOperationLogRepository operationLogRepository;

    public OperationLogService(IOperationLogRepository operationLogRepository) {
        this.operationLogRepository = operationLogRepository;
    }

    public List<OperationLog> getAllOperationLogs() {
        return this.operationLogRepository.findAll();
    }

    @Transactional
    public void addOperationLog(OperationLog operationLog) {
        this.operationLogRepository.save(operationLog);
    }
}
