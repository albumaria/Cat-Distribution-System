package com.mariaalbu.catdistributionsystem.controller;

import com.mariaalbu.catdistributionsystem.model.Cat;
import com.mariaalbu.catdistributionsystem.model.MischiefRecord;
import com.mariaalbu.catdistributionsystem.service.CatService;
import com.mariaalbu.catdistributionsystem.service.MischiefRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/mischief")
public class MischiefRecordController {
    private final MischiefRecordService mischiefRecordService;
    private final CatService catService;

    @Autowired
    public MischiefRecordController(MischiefRecordService mischiefRecordService, CatService catService) {
        this.mischiefRecordService = mischiefRecordService;
        this.catService = catService;
    }

    @GetMapping
    public List<MischiefRecord> getAllMischiefRecords() {
        return this.mischiefRecordService.getAllRecords();
    }

    @GetMapping("/{id}")
    public Optional<MischiefRecord> getMischiefRecordById(@PathVariable UUID id) {
        return this.mischiefRecordService.getMischiefRecordById(id);
    }

    @PostMapping("/{catId}")
    public void addMischiefRecord(@PathVariable UUID catId, @RequestBody MischiefRecord mischiefRecord) {
        try {
            mischiefRecord.setId(null);

            Cat cat = catService.getCatById(catId)
                    .orElseThrow(() -> new IllegalArgumentException("Cat not found with ID: " + catId));
            mischiefRecord.setCat(cat);

            System.out.println("Received mischief record: " + mischiefRecord);
            mischiefRecordService.addMischiefRecord(mischiefRecord);
        }
        catch (IllegalArgumentException e) {
            System.err.println(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public void deleteMischiefRecord(@PathVariable UUID id) {
        mischiefRecordService.deleteMischiefRecord(id);
    }

    @PatchMapping("/{id}")
    public void updateMischiefRecord(@PathVariable UUID id, @RequestBody MischiefRecord updatedMischiefRecord) {
        try {
            MischiefRecord existingRecord = mischiefRecordService.getMischiefRecordById(id)
                    .orElseThrow(() -> new IllegalArgumentException("Mischief record not found with ID: " + id));

            updatedMischiefRecord.setCat(existingRecord.getCat());
            updatedMischiefRecord.setId(id);
            updatedMischiefRecord.setVersion(existingRecord.getVersion());

            System.out.println("Received mischief record: " + updatedMischiefRecord);
            mischiefRecordService.updateMischiefRecord(updatedMischiefRecord);
        }
        catch (IllegalArgumentException e) {
            System.err.println(e.getMessage());
        }
    }

    @GetMapping("/cat/{catId}")
    public List<MischiefRecord> getMischiefRecordsByCatId(@PathVariable UUID catId) {
        return mischiefRecordService.getRecordsByCatId(catId);
    }

    @GetMapping("/filter-sort")
    public List<MischiefRecord> filterAndSortMischiefRecords(
            @RequestParam(required = false) UUID catId,
            @RequestParam(required = false) String descriptionFilter,
            @RequestParam(required = false) Boolean wasCaught,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) Boolean ascending) {
        return mischiefRecordService.filterAndSortMischiefRecords(catId, descriptionFilter, wasCaught, sortBy, ascending);
    }
}

