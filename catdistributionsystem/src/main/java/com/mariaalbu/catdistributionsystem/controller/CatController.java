package com.mariaalbu.catdistributionsystem.controller;

import com.mariaalbu.catdistributionsystem.model.Cat;
import com.mariaalbu.catdistributionsystem.service.CatService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/cats")
public class CatController {
    private final CatService catService;

    public CatController(CatService catService) {
        this.catService = catService;
    }

    @GetMapping
    public List<Cat> getAllCats() {
        return catService.getAllCats();
    }

    @GetMapping("/{id}")
    public Optional<Cat> getCatById(@PathVariable UUID id) {
        return catService.getCatById(id);
    }

    @PostMapping
    public void addCat(@RequestBody Cat cat) {
        try {
            UUID newId = UUID.randomUUID();
            cat.setId(newId);
            catService.addCat(cat);
        }
        catch (IllegalArgumentException e) {
            System.err.println(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public void deleteCat(@PathVariable UUID id) {
        catService.deleteCat(id);
    }

    @PatchMapping("/{id}")
    public void updateCat(@PathVariable UUID id, @RequestBody Cat updatedCat) {
        try {
            catService.updateCat(id, updatedCat);
        }
        catch (IllegalArgumentException e) {
            System.err.println(e.getMessage());
        }
    }

    @GetMapping("/filter-sort")
    public List<Cat> filterAndSortCats(@RequestParam(required = false) String nameFilter, @RequestParam(required = false) Integer minAge, @RequestParam(required = false) Integer maxAge, @RequestParam(required = false) String sortBy, @RequestParam(required = false) Boolean ascending) {
        return catService.filterAndSortCats(nameFilter, minAge, maxAge, sortBy, ascending);
    }
}
