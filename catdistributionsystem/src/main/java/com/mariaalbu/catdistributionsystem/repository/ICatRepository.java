package com.mariaalbu.catdistributionsystem.repository;

import com.mariaalbu.catdistributionsystem.model.Cat;
import com.mariaalbu.catdistributionsystem.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface ICatRepository extends JpaRepository<Cat, UUID> {
    boolean existsByNameIgnoreCase(String name);
    boolean existsByName(String name);

    @Query("SELECT c FROM Cat c WHERE " +
            "(:user IS NULL OR c.user.id = :userId) AND " +
            "(:nameFilter IS NULL OR :nameFilter = '' OR LOWER(c.name) LIKE LOWER(CONCAT('%', :nameFilter, '%'))) AND " +
            "(:minAge IS NULL OR c.age >= :minAge) AND " +
            "(:maxAge IS NULL OR c.age <= :maxAge) " +
            "ORDER BY " +
            "CASE WHEN :sortBy = 'age' AND :ascending = true THEN c.age END ASC, " +
            "CASE WHEN :sortBy = 'age' AND :ascending = false THEN c.age END DESC, " +
            "CASE WHEN :sortBy = 'name' AND :ascending = true THEN LOWER(c.name) END ASC, " +
            "CASE WHEN :sortBy = 'name' AND :ascending = false THEN LOWER(c.name) END DESC, " +
            "CASE WHEN :sortBy = 'weight' AND :ascending = true THEN c.weight END ASC, " +
            "CASE WHEN :sortBy = 'weight' AND :ascending = false THEN c.weight END DESC, " +
            "CASE WHEN :sortBy IS NULL THEN c.id END ASC")
    List<Cat> filterAndSortCats(
            @Param("nameFilter") String nameFilter,
            @Param("minAge") Integer minAge,
            @Param("maxAge") Integer maxAge,
            @Param("sortBy") String sortBy,
            @Param("ascending") Boolean ascending,
            @Param("user") User user,
            @Param("userId") UUID userId);
}
