package com.mariaalbu.catdistributionsystem.repository;

import com.mariaalbu.catdistributionsystem.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface IUserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByUsername(String username);
    List<User> findByIsMonitoredTrue();

    @Modifying
    @Query("UPDATE User u SET u.isMonitored = true WHERE u.id = :userId")
    void markAsMonitored(@Param("userId") UUID userId);
}
