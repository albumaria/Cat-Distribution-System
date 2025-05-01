package com.mariaalbu.catdistributionsystem.repository;

import com.mariaalbu.catdistributionsystem.model.Cat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ICatRepository extends JpaRepository<Cat, UUID> {
    boolean existsByNameIgnoreCase(String name);
}
