package com.mariaalbu.catdistributionsystem.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mariaalbu.catdistributionsystem.model.Cat;
import com.mariaalbu.catdistributionsystem.service.CatService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.*;

import static org.hamcrest.Matchers.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
public class CatControllerTest {

    private MockMvc mockMvc;

    @Mock
    private CatService catService;

    @InjectMocks
    private CatController catController;

    private ObjectMapper objectMapper;
    private Cat testCat1;
    private Cat testCat2;
    private UUID id1;
    private UUID id2;

    @BeforeEach
    void setUp() {
        objectMapper = new ObjectMapper();

        mockMvc = MockMvcBuilders.standaloneSetup(catController).build();

        id1 = UUID.randomUUID();
        id2 = UUID.randomUUID();

        testCat1 = new Cat();
        testCat1.setId(id1);
        testCat1.setName("Whiskers");
        testCat1.setGender("F");
        testCat1.setAge(3);
        testCat1.setWeight(2.3);
        testCat1.setDescription("good cat");
        testCat1.setImage("https://yes.com");

        testCat2 = new Cat();
        testCat2.setId(id2);
        testCat2.setName("Mittens");
        testCat2.setGender("F");
        testCat2.setAge(2);
        testCat2.setWeight(1.3);
        testCat2.setDescription("bad cat");
        testCat2.setImage("https://no.com");
    }

    @Test
    void getAllCats_testReturnListOfCats() throws Exception {
        List<Cat> cats = Arrays.asList(testCat1, testCat2);
        when(catService.getAllCats()).thenReturn(cats);

        mockMvc.perform(get("/cats"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].id").value(id1.toString()))
                .andExpect(jsonPath("$[0].name").value("Whiskers"))
                .andExpect(jsonPath("$[1].id").value(id2.toString()))
                .andExpect(jsonPath("$[1].name").value("Mittens"));

        verify(catService, times(1)).getAllCats();
    }

    @Test
    void getCatById_testReturnCat() throws Exception {
        when(catService.getCatById(id1)).thenReturn(Optional.of(testCat1));

        mockMvc.perform(get("/cats/{id}", id1))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(id1.toString()))
                .andExpect(jsonPath("$.name").value("Whiskers"))
                .andExpect(jsonPath("$.age").value(3));

        verify(catService, times(1)).getCatById(id1);
    }

    @Test
    void addCat_testAssignIdAndCallService() throws Exception {
        Cat newCat = new Cat();
        newCat.setName("Fluffy");
        newCat.setAge(2);

        mockMvc.perform(post("/cats")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(newCat)))
                .andExpect(status().isOk());

        ArgumentCaptor<Cat> catCaptor = ArgumentCaptor.forClass(Cat.class);
        verify(catService, times(1)).addCat(catCaptor.capture());

        Cat capturedCat = catCaptor.getValue();
        assertNotNull(capturedCat.getId());
        assertEquals("Fluffy", capturedCat.getName());
        assertEquals(2, capturedCat.getAge());
    }

    @Test
    void addCat_testHandleException() throws Exception {
        Cat invalidCat = new Cat();
        invalidCat.setName("Invalid");

        doThrow(new IllegalArgumentException("Invalid cat data")).when(catService).addCat(any());

        mockMvc.perform(post("/cats")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidCat)))
                .andExpect(status().isOk());

        verify(catService, times(1)).addCat(any());
    }

    @Test
    void deleteCat_testCallServiceWithId() throws Exception {
        mockMvc.perform(delete("/cats/{id}", id1))
                .andExpect(status().isOk());

        verify(catService, times(1)).deleteCat(id1);
    }

    @Test
    void updateCat_testCallServiceWithIdAndUpdatedCat() throws Exception {
        Cat updatedCat = new Cat();
        updatedCat.setName("Updated Whiskers");
        updatedCat.setAge(4);

        mockMvc.perform(patch("/cats/{id}", id1)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updatedCat)))
                .andExpect(status().isOk());

        verify(catService, times(1)).updateCat(eq(id1), any(Cat.class));
    }

    @Test
    void updateCat_testHandleException() throws Exception {
        Cat invalidCat = new Cat();
        invalidCat.setName("Invalid Update");

        doThrow(new IllegalArgumentException("Invalid update data")).when(catService).updateCat(eq(id1), any(Cat.class));

        mockMvc.perform(patch("/cats/{id}", id1)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidCat)))
                .andExpect(status().isOk());

        verify(catService, times(1)).updateCat(eq(id1), any(Cat.class));
    }

    @Test
    void filterAndSortCats_testCallServiceWithParameters() throws Exception {
        List<Cat> filteredCats = new ArrayList<>();
        filteredCats.add(testCat1);
        when(catService.filterAndSortCats("Whiskers", 2, 4, "age", true)).thenReturn(filteredCats);

        mockMvc.perform(get("/cats/filter-sort")
                        .param("nameFilter", "Whiskers")
                        .param("minAge", "2")
                        .param("maxAge", "4")
                        .param("sortBy", "age")
                        .param("ascending", "true"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].name").value("Whiskers"));

        verify(catService, times(1)).filterAndSortCats("Whiskers", 2, 4, "age", true);
    }

    @Test
    void filterAndSortCats_testCallServiceCorrectly() throws Exception {
        List<Cat> allCats = Arrays.asList(testCat1, testCat2);
        when(catService.filterAndSortCats(null, null, null, null, null)).thenReturn(allCats);

        mockMvc.perform(get("/cats/filter-sort"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", hasSize(2)));

        verify(catService, times(1)).filterAndSortCats(null, null, null, null, null);
    }
}