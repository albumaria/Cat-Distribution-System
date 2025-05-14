package com.mariaalbu.catdistributionsystem.service;

import com.mariaalbu.catdistributionsystem.repository.IOperationLogRepository;
import com.mariaalbu.catdistributionsystem.repository.IUserRepository;
import jakarta.transaction.Transactional;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

///
/// INSERT INTO operation_logs (id, action, entity, performdate, user_id, version)
/// SELECT gen_random_uuid(), 'Update', 'Cat', NOW() - INTERVAL '30 seconds', '8254ff93-4fdf-4bdd-86d5-5bff6da5c343', 0
/// FROM generate_series(1, 30);
///

@Service
public class OperationMonitorService {
    private final IOperationLogRepository operationLogRepository;
    private final IUserRepository userRepository;

    public OperationMonitorService(IOperationLogRepository operationLogRepository, IUserRepository userRepository) {
        this.operationLogRepository = operationLogRepository;
        this.userRepository = userRepository;
    }

    @Scheduled(fixedRate = 30_000)
    @Transactional
    public void monitorOperations() {
        LocalDateTime cutoff = LocalDateTime.now().minusMinutes(5);

        List<Object[]> results = operationLogRepository.countOperationsPerUserSince(cutoff);

        for (Object[] row : results) {
            UUID userId = (UUID) row[0];
            Long opCount = (Long) row[1];

            if (opCount > 20) {
                userRepository.markAsMonitored(userId);
            }
        }
    }
}
