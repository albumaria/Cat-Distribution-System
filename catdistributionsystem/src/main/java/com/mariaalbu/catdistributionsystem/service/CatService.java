package com.mariaalbu.catdistributionsystem.service;

import com.mariaalbu.catdistributionsystem.model.Cat;
import com.mariaalbu.catdistributionsystem.model.User;
import com.mariaalbu.catdistributionsystem.repository.ICatRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CatService {
    private final ICatRepository catRepository;

    public CatService(ICatRepository catRepository) {
        this.catRepository = catRepository;
    }

    public List<Cat> getAllCats() {
        return catRepository.findAll();
    }

    public Optional<Cat> getCatById(UUID id) {
        return catRepository.findById(id);
    }

    @Transactional
    public void addCat(Cat cat) {
        validateCat(cat, false);
        catRepository.save(cat);
    }

    public void deleteCat(UUID id) {
        catRepository.deleteById(id);
    }

    public void updateCat(UUID id, Cat updatedCat) {
        validateCat(updatedCat, true);
        Cat existingCat = this.catRepository.findById(id).orElse(null);
        updatedCat.setId(id);
        updatedCat.setUser(existingCat.getUser());
        updatedCat.setVersion(existingCat.getVersion());
        catRepository.save(updatedCat);
    }

    public List<Cat> filterAndSortCats(String nameFilter, Integer minAge, Integer maxAge, String sortBy, Boolean ascending, User user) {
        Boolean ascendingValue = ascending != null ? ascending : true;

        UUID userId = user != null ? user.getId() : null;

        return catRepository.filterAndSortCats(
                nameFilter,
                minAge,
                maxAge,
                sortBy,
                ascendingValue,
                user,
                userId
        );
    }

    private void validateCat(Cat cat, boolean isUpdate) {
        if (cat.getName() == null || cat.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Name must be a non-empty string.");
        }

        boolean isDuplicateName = catRepository.findAll().stream()
                .anyMatch(existingCat -> existingCat.getName().equalsIgnoreCase(cat.getName()));

//        if (isDuplicateName && !isUpdate) {
//            throw new IllegalArgumentException("A cat with this name already exists.");
//        }

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
