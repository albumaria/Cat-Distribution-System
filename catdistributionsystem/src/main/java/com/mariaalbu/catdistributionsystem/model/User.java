package com.mariaalbu.catdistributionsystem.model;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue
    private UUID id;

    private String username;

    private String passwordhash;

    private String email;

    private String role;

    private LocalDateTime createdate;

    @Version
    private Long version = 0L;

    private Boolean isMonitored;
}
