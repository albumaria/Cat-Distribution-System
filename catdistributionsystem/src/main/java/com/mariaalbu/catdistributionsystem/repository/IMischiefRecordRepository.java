package com.mariaalbu.catdistributionsystem.repository;

import com.mariaalbu.catdistributionsystem.model.MischiefRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface IMischiefRecordRepository extends JpaRepository<MischiefRecord, UUID> {
    List<MischiefRecord> findByCat_Id(UUID catId);
}
