package com.mariaalbu.catdistributionsystem.repository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mariaalbu.catdistributionsystem.model.Cat;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.util.stream.Collectors;
import java.util.*;

@Component
public class CatRepository {
    private final List<Cat> cats = new ArrayList<>();

    public CatRepository() {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            List<Cat> catList = objectMapper.readValue(new File("D:\\Cat-Distribution-System-React-App\\catdistributionsystem\\src\\main\\java\\com\\mariaalbu\\catdistributionsystem\\repository\\cats.json"), new TypeReference<List<Cat>>() {});
            catList.forEach(cat -> cats.add(new Cat(UUID.randomUUID(), cat.getName(), cat.getGender(), cat.getAge(), cat.getWeight(), cat.getDescription(), cat.getImage())));
        }
        catch (IOException e) {
            e.printStackTrace();
        }
    }

    public List<Cat> findAll() {
        return cats;
    }

    public Optional<Cat> findById(UUID id) {
        return cats.stream().filter(cat -> cat.getId().equals(id)).findFirst();
    }

    public void addCat(Cat cat) {
        cats.add(cat);
    }

    public void deleteCat(UUID id) {
        cats.removeIf(cat -> cat.getId().equals(id));
    }

    public void updateCat(UUID id, Cat updatedCat) {
        for (int i = 0; i < cats.size(); i++) {
            if (cats.get(i).getId().equals(id)) {
                cats.set(i, updatedCat);
                break;
            }
        }
    }

    public List<Cat> filterAndSortCats(String nameFilter, Integer minAge, Integer maxAge, String sortBy, Boolean ascending) {
        return cats.stream()
                .filter(cat -> nameFilter == null || nameFilter.isEmpty() ||
                        cat.getName().toLowerCase().contains(nameFilter.toLowerCase()))
                .filter(cat -> minAge == null || cat.getAge() >= minAge)
                .filter(cat -> maxAge == null || cat.getAge() <= maxAge)
                .sorted((cat1, cat2) -> {
                    if (sortBy == null || sortBy.isEmpty()) {
                        return 0;
                    }

                    int comparisonResult = 0;
                    switch (sortBy.toLowerCase()) {
                        case "age":
                            comparisonResult = Integer.compare(cat1.getAge(), cat2.getAge());
                            break;
                        case "name":
                            comparisonResult = cat1.getName().compareToIgnoreCase(cat2.getName());
                            break;
                        case "weight":
                            comparisonResult = Double.compare(cat1.getWeight(), cat2.getWeight());
                            break;
                        default:
                            comparisonResult = 0;
                    }

                    return (ascending != null && ascending) ? comparisonResult : -comparisonResult;
                })
                .collect(Collectors.toList());
    }
}
