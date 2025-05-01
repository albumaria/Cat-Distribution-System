package com.mariaalbu.catdistributionsystem.service;

import com.mariaalbu.catdistributionsystem.model.MischiefRecord;
import com.mariaalbu.catdistributionsystem.repository.IMischiefRecordRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class MischiefRecordService {
    private final IMischiefRecordRepository mischiefRecordRepository;

    public MischiefRecordService(IMischiefRecordRepository mischiefRecordRepository) {
        this.mischiefRecordRepository = mischiefRecordRepository;
    }

    public List<MischiefRecord> getAllRecords() {
        return this.mischiefRecordRepository.findAll();
    }

    public List<MischiefRecord> getRecordsByCatId(UUID catId) {
        return this.mischiefRecordRepository.findByCat_Id(catId);
    }

    public Optional<MischiefRecord> getMischiefRecordById(UUID id) {
        return this.mischiefRecordRepository.findById(id);
    }

    @Transactional
    public void addMischiefRecord(MischiefRecord record) {
        validateMischiefRecord(record);
        this.mischiefRecordRepository.save(record);
    }

    @Transactional
    public void deleteMischiefRecord(UUID id) {
        this.mischiefRecordRepository.deleteById(id);
    }

    @Transactional
    public void updateMischiefRecord(MischiefRecord updatedRecord) {
        validateMischiefRecord(updatedRecord);
        this.mischiefRecordRepository.save(updatedRecord);
    }

    private void validateMischiefRecord(MischiefRecord record) {
        if (record.getCat() == null || record.getCat().getId() == null) {
            throw new IllegalArgumentException("Record must be associated with a valid cat.");
        }

        if (record.getDescription() == null || record.getDescription().trim().isEmpty()) {
            throw new IllegalArgumentException("Description cannot be empty.");
        }

        if (record.getSeverity() < 1 || record.getSeverity() > 10) {
            throw new IllegalArgumentException("Severity must be between 1 and 10.");
        }
    }

    public List<MischiefRecord> filterAndSortMischiefRecords(UUID catId, String descriptionFilter, Boolean wasCaught, String sortBy, Boolean ascending) {
        List<MischiefRecord> records = new ArrayList<>();

        if (catId != null) {
            records = mischiefRecordRepository.findByCat_Id(catId);
        } else {
            records = mischiefRecordRepository.findAll();
        }

        if (descriptionFilter != null && !descriptionFilter.trim().isEmpty()) {
            records = records.stream()
                    .filter(record -> record.getDescription().toLowerCase().contains(descriptionFilter.toLowerCase()))
                    .toList();
        }

        if (wasCaught != null) {
            records = records.stream()
                    .filter(record -> record.isWas_caught() == wasCaught)
                    .toList();
        }

        if (sortBy != null && !sortBy.trim().isEmpty()) {
            Comparator<MischiefRecord> comparator = switch (sortBy) {
                case "description" -> Comparator.comparing(MischiefRecord::getDescription, String.CASE_INSENSITIVE_ORDER);
                case "severity" -> Comparator.comparingInt(MischiefRecord::getSeverity);
                case "wasCaught" -> Comparator.comparing(MischiefRecord::isWas_caught);
                default -> null;
            };

            if (comparator != null) {
                if (ascending != null && !ascending) {
                    comparator = comparator.reversed();
                }
                records = records.stream()
                        .sorted(comparator)
                        .toList();
            }
        }

        return records;
    }
}
