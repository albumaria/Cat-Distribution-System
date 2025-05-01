package com.mariaalbu.catdistributionsystem.service;

import com.mariaalbu.catdistributionsystem.model.Cat;
import com.mariaalbu.catdistributionsystem.repository.ICatRepository;
import org.junit.jupiter.api.*;
import org.mockito.*;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class CatServiceTest {

    @Mock
    private ICatRepository catRepository;

    @InjectMocks
    private CatService catService;

    private Cat testCat;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        testCat = new Cat();
        testCat.setId(UUID.randomUUID());
        testCat.setName("Whiskers");
        testCat.setGender("M");
        testCat.setAge(3);
        testCat.setWeight(4.5);
        testCat.setDescription("A cute little cat");
        testCat.setImage("whiskers.jpg");
    }

    @Test
    void getAllCats_testGetAllCats() {
        List<Cat> cats = List.of(testCat);
        when(catRepository.findAll()).thenReturn(cats);

        List<Cat> result = catService.getAllCats();

        assertEquals(1, result.size());
        assertEquals("Whiskers", result.getFirst().getName());
    }

    @Test
    void getCatById_testGetCatById() {
        UUID catId = testCat.getId();
        when(catRepository.findById(catId)).thenReturn(Optional.of(testCat));

        Optional<Cat> result = catService.getCatById(catId);

        assertTrue(result.isPresent());
        assertEquals("Whiskers", result.get().getName());
        verify(catRepository, times(1)).findById(catId);
    }

    @Test
    void addCat_testAddCat() {
        when(catRepository.findAll()).thenReturn(Collections.emptyList());
        catService.addCat(testCat);
        verify(catRepository, times(1)).save(testCat);
    }

    @Test
    void addCat_testAddCatWithDuplicateName() {
        when(catRepository.findAll()).thenReturn(List.of(testCat));
        Cat duplicateCat = new Cat();
        duplicateCat.setName("Whiskers");
        Exception exception = assertThrows(IllegalArgumentException.class, () -> catService.addCat(duplicateCat));
        assertEquals("A cat with this name already exists.", exception.getMessage());
    }

    @Test
    void addCat_testAddCatWithNoName() {
        Cat newCat = new Cat();
        Exception exception = assertThrows(IllegalArgumentException.class, () -> catService.addCat(newCat));
        assertEquals("Name must be a non-empty string.", exception.getMessage());
    }

    @Test
    void addCat_testAddCatWithWrongGender() {
        Cat newCat = new Cat();
        newCat.setName("Whiskers");
        newCat.setGender("Wrong");
        Exception exception = assertThrows(IllegalArgumentException.class, () -> catService.addCat(newCat));
        assertEquals("Gender must be 'F' or 'M'.", exception.getMessage());
    }

    @Test
    void addCat_testAddCatWithWrongAge() {
        Cat newCat = new Cat();
        newCat.setName("Whiskers");
        newCat.setGender("F");
        newCat.setAge(-2);
        Exception exception = assertThrows(IllegalArgumentException.class, () -> catService.addCat(newCat));
        assertEquals("Age must be a whole number between 0 and 25.", exception.getMessage());
    }

    @Test
    void addCat_testAddCatWithWrongWeight() {
        Cat newCat = new Cat();
        newCat.setName("Whiskers");
        newCat.setGender("F");
        newCat.setAge(2);
        newCat.setWeight(-2);
        Exception exception = assertThrows(IllegalArgumentException.class, () -> catService.addCat(newCat));
        assertEquals("Weight must be a number between 0 and 30.", exception.getMessage());
    }

    @Test
    void addCat_testAddCatWithNoDescription() {
        Cat newCat = new Cat();
        newCat.setName("Whiskers");
        newCat.setGender("F");
        newCat.setAge(2);
        newCat.setWeight(2);
        Exception exception = assertThrows(IllegalArgumentException.class, () -> catService.addCat(newCat));
        assertEquals("Description cannot be empty.", exception.getMessage());
    }

    @Test
    void addCat_testAddCatWithNoImage() {
        Cat newCat = new Cat();
        newCat.setName("Whiskers");
        newCat.setGender("F");
        newCat.setAge(2);
        newCat.setWeight(2);
        newCat.setDescription("Pluuugg");
        Exception exception = assertThrows(IllegalArgumentException.class, () -> catService.addCat(newCat));
        assertEquals("You must upload an image.", exception.getMessage());
    }

    @Test
    void deleteCat_testDeleteCat() {
        UUID catId = testCat.getId();
        catService.deleteCat(catId);
        assertEquals(0, catRepository.findAll().size());
    }


    @Test
    void updateCat_testUpdateCatWithNoName() {
        UUID catId = testCat.getId();
        Cat updatedCat = new Cat();
        Exception exception = assertThrows(IllegalArgumentException.class, () -> catService.updateCat(catId, updatedCat));
        assertEquals("Name must be a non-empty string.", exception.getMessage());
    }

    @Test
    void updateCat_testUpdateCatWithWrongGender() {
        UUID catId = testCat.getId();
        Cat updatedCat = new Cat();
        updatedCat.setName("Whiskers");
        updatedCat.setGender("Wrong");
        Exception exception = assertThrows(IllegalArgumentException.class, () -> catService.updateCat(catId, updatedCat));
        assertEquals("Gender must be 'F' or 'M'.", exception.getMessage());
    }

    @Test
    void updateCat_testUpdateCatWithWrongAge() {
        UUID catId = testCat.getId();
        Cat updatedCat = new Cat();
        updatedCat.setName("Whiskers");
        updatedCat.setGender("F");
        updatedCat.setAge(-2);
        Exception exception = assertThrows(IllegalArgumentException.class, () -> catService.updateCat(catId, updatedCat));
        assertEquals("Age must be a whole number between 0 and 25.", exception.getMessage());
    }

    @Test
    void updateCat_testUpdateCatWithWrongWeight() {
        UUID catId = testCat.getId();
        Cat updatedCat = new Cat();
        updatedCat.setName("Whiskers");
        updatedCat.setGender("F");
        updatedCat.setAge(20);
        updatedCat.setWeight(-5);
        Exception exception = assertThrows(IllegalArgumentException.class, () -> catService.updateCat(catId, updatedCat));
        assertEquals("Weight must be a number between 0 and 30.", exception.getMessage());
    }

    @Test
    void updateCat_testUpdateCatWithNoDescription() {
        UUID catId = testCat.getId();
        Cat updatedCat = new Cat();
        updatedCat.setName("Whiskers");
        updatedCat.setGender("F");
        updatedCat.setAge(20);
        updatedCat.setWeight(2);
        Exception exception = assertThrows(IllegalArgumentException.class, () -> catService.updateCat(catId, updatedCat));
        assertEquals("Description cannot be empty.", exception.getMessage());
    }

    @Test
    void updateCat_testUpdateCatWithNoImage() {
        UUID catId = testCat.getId();
        Cat updatedCat = new Cat();
        updatedCat.setName("Whiskers");
        updatedCat.setGender("F");
        updatedCat.setAge(20);
        updatedCat.setWeight(2);
        updatedCat.setDescription("Ringanguriguriguri");
        Exception exception = assertThrows(IllegalArgumentException.class, () -> catService.updateCat(catId, updatedCat));
        assertEquals("You must upload an image.", exception.getMessage());
    }
}