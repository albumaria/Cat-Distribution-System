package com.mariaalbu.catdistributionsystem.service;

import com.mariaalbu.catdistributionsystem.model.Cat;
import com.mariaalbu.catdistributionsystem.repository.CatRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.UUID;

@Service
public class CatService {
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
        catRepository.addCat(cat);
    }

    public void deleteCat(UUID id) {
        catRepository.deleteCat(id);
    }

    public void updateCat(UUID id, Cat updatedCat) {
        catRepository.updateCat(id, updatedCat);
    }

    public List<Cat> filterAndSortCats(String nameFilter, Integer minAge, Integer maxAge, String sortBy, Boolean ascending) {
        return catRepository.filterAndSortCats(nameFilter, minAge, maxAge, sortBy, ascending);
    }
}
