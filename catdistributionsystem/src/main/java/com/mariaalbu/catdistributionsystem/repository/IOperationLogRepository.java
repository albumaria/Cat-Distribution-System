package com.mariaalbu.catdistributionsystem.repository;

import com.mariaalbu.catdistributionsystem.model.OperationLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface IOperationLogRepository extends JpaRepository<OperationLog, UUID> {
}
