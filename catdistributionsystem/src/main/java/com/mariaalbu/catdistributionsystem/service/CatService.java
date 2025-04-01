package com.mariaalbu.catdistributionsystem.service;

import com.mariaalbu.catdistributionsystem.model.Cat;
import com.mariaalbu.catdistributionsystem.repository.CatRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.UUID;

@Service
public class CatService implements ICatService {
    private final CatRepository catRepository;

    public CatService(CatRepository catRepository) {
        this.catRepository = catRepository;
    }

    public List<Cat> getAllCats() {
        return catRepository.findAll();
    }

    public Optional<Cat> getCatById(UUID id) {
        return catRepository.findById(id);
    }

    public void addCat(Cat cat) {
        validateCat(cat, false);
        catRepository.addCat(cat);
    }

    public void deleteCat(UUID id) {
        catRepository.deleteCat(id);
    }

    public void updateCat(UUID id, Cat updatedCat) {
        validateCat(updatedCat, true);
        catRepository.updateCat(id, updatedCat);
    }

    public List<Cat> filterAndSortCats(String nameFilter, Integer minAge, Integer maxAge, String sortBy, Boolean ascending) {
        return catRepository.filterAndSortCats(nameFilter, minAge, maxAge, sortBy, ascending);
    }

    private void validateCat(Cat cat, boolean isUpdate) {
        if (cat.getName() == null || cat.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Name must be a non-empty string.");
        }

        boolean isDuplicateName = catRepository.findAll().stream()
                .anyMatch(existingCat -> existingCat.getName().equalsIgnoreCase(cat.getName()));

        if (isDuplicateName && !isUpdate) {
            throw new IllegalArgumentException("A cat with this name already exists.");
        }

        if (!cat.getGender().equalsIgnoreCase("F") && !cat.getGender().equalsIgnoreCase("M")) {
            throw new IllegalArgumentException("Gender must be 'F' or 'M'.");
        }

        if (cat.getAge() < 0 || cat.getAge() > 25) {
            throw new IllegalArgumentException("Age must be a whole number between 0 and 25.");
        }

        if (cat.getWeight() <= 0 || cat.getWeight() > 30) {
            throw new IllegalArgumentException("Weight must be a number between 0 and 30.");
        }

        if (cat.getDescription() == null || cat.getDescription().trim().isEmpty()) {
            throw new IllegalArgumentException("Description cannot be empty.");
        }

        if (cat.getImage() == null || cat.getImage().trim().isEmpty()) {
            throw new IllegalArgumentException("You must upload an image.");
        }
    }
}
