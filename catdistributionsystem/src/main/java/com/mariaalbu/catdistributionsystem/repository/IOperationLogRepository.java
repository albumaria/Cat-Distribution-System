package com.mariaalbu.catdistributionsystem.repository;

import com.mariaalbu.catdistributionsystem.model.OperationLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface IOperationLogRepository extends JpaRepository<OperationLog, UUID> {
    @Query("SELECT o.user.id, COUNT(o) FROM OperationLog o WHERE o.performdate > :since GROUP BY o.user.id")
    List<Object[]> countOperationsPerUserSince(@Param("since") LocalDateTime since);
}
