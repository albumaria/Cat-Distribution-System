package com.mariaalbu.catdistributionsystem.controller;

import com.mariaalbu.catdistributionsystem.model.Cat;
import com.mariaalbu.catdistributionsystem.service.CatGeneratorService;
import com.mariaalbu.catdistributionsystem.service.CatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/cats")
public class CatController {
    private final CatService catService;
    private final CatGeneratorService catGeneratorService;

    @Autowired
    public CatController(CatService catService, CatGeneratorService catGeneratorService) {
        this.catService = catService;
        this.catGeneratorService = catGeneratorService;
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

    @GetMapping("/generator/status")
    public Map<String, Boolean> getGeneratorStatus() {
        return Map.of("isGenerating", catGeneratorService.isGenerating());
    }

    @PostMapping("/generator/start")
    public void startGenerator() {
        catGeneratorService.startGenerating();
    }

    @PostMapping("/generator/stop")
    public void stopGenerator() {
        catGeneratorService.stopGenerating();
    }

    // WebSocket endpoints
    @MessageMapping("/request-cats")
    @SendTo("/topic/cats-list")
    public List<Cat> sendCatsList() {
        return catService.getAllCats();
    }
}
