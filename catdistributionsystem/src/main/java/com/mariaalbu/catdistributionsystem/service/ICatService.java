package com.mariaalbu.catdistributionsystem.service;

import com.mariaalbu.catdistributionsystem.model.Cat;
import com.mariaalbu.catdistributionsystem.repository.CatRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ICatService {
    public List<Cat> getAllCats();

    public Optional<Cat> getCatById(UUID id);

    public void addCat(Cat cat);

    public void deleteCat(UUID id);

    public void updateCat(UUID id, Cat updatedCat);

    public List<Cat> filterAndSortCats(String nameFilter, Integer minAge, Integer maxAge, String sortBy, Boolean ascending);
}
