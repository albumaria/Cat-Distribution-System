package com.mariaalbu.catdistributionsystem.model;

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
@Table(name = "cats")
public class Cat {
    @Id
    @GeneratedValue
    private UUID id;

    private String name;

    private String gender;

    private int age;

    private double weight;

    private String description;

    private String image;

    @Version
    private Long version = 0L;
}
