package com.mariaalbu.catdistributionsystem.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "mischief_records")
public class MischiefRecord {
    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "cat_id", nullable = false)
    private Cat cat;

    private String description;

    private int severity;

    private boolean was_caught;

    @Version
    private Long version = 0L;
}