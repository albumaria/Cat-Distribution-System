package com.mariaalbu.catdistributionsystem.service;

import com.mariaalbu.catdistributionsystem.model.Cat;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.HashSet;
import java.util.Set;

@Service
public class CatGeneratorService {

    private final CatService catService;
    private final SimpMessagingTemplate messagingTemplate;
    private final Random random = new Random();
    private final ScheduledExecutorService scheduler = Executors.newSingleThreadScheduledExecutor();
    private final AtomicBoolean isGenerating = new AtomicBoolean(false);
    private final Set<String> usedNames = new HashSet<>();
    private final RestTemplate restTemplate = new RestTemplate();

    private static final String[] CAT_NAMES = {
            "Oliver", "Bella", "Leo", "Lily", "Milo", "Nala", "Simba",
            "Chloe", "Max", "Lucy", "Charlie", "Willow", "Jasper", "Ruby", "Oscar",
            "Sophie", "Jack", "Stella", "Felix", "Cleo", "Loki", "Zoe", "Toby",
            "Emma", "George", "Penny", "Gus", "Rosie", "Finn", "Molly", "Tucker",
            "Daisy", "Winston", "Maggie", "Sam", "Mittens", "Louie", "Ellie", "Apollo",
            "Gracie", "Henry", "Sadie", "Buddy", "Hazel", "Mochi", "Lola", "Rocky"
    };

    private static final String[] PERSONALITY_TRAITS = {
            "playful and full of energy",
            "calm and affectionate",
            "curious about everything",
            "a little mischievous but very loving",
            "shy at first, but warms up quickly",
            "always looking for a warm lap to sit on",
            "a big talker who loves attention",
            "an independent spirit with a gentle heart",
            "a little clumsy but incredibly sweet",
            "a brave explorer who loves adventure"
    };

    private static final String CAT_API_URL = "https://api.thecatapi.com/v1/images/search";
    private static final String CAT_API_KEY = "live_vqheiDqxrBRmftyRK83qVlcbmM4fv8PfvvODBg7XLAQ8DQmcWdrVcutiUoMxkPss";

    @Autowired
    public CatGeneratorService(CatService catService, SimpMessagingTemplate messagingTemplate) {
        this.catService = catService;
        this.messagingTemplate = messagingTemplate;
    }

    public void startGenerating() {
        if (isGenerating.compareAndSet(false, true)) {
            scheduler.scheduleAtFixedRate(this::generateAndBroadcastCat, 0, 3, TimeUnit.SECONDS);
        }
    }

    public void stopGenerating() {
        isGenerating.set(false);
    }

    private void generateAndBroadcastCat() {
        if (!isGenerating.get()) {
            return;
        }

        try {
            Cat newCat = generateRandomCat();
            catService.addCat(newCat);

            messagingTemplate.convertAndSend("/topic/cats", newCat);
            messagingTemplate.convertAndSend("/topic/cats-list", catService.getAllCats());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private String generateUniqueName() {
        String name;
        do {
            name = CAT_NAMES[random.nextInt(CAT_NAMES.length)];
        } while (usedNames.contains(name));
        usedNames.add(name);
        return name;
    }

    private String fetchCatImage() {
        try {
            org.springframework.http.HttpHeaders headers = new org.springframework.http.HttpHeaders();
            headers.set("x-api-key", CAT_API_KEY);
            org.springframework.http.HttpEntity<String> entity = new org.springframework.http.HttpEntity<>("parameters", headers);

            org.springframework.http.ResponseEntity<CatApiResponse[]> response =
                    restTemplate.exchange(CAT_API_URL, org.springframework.http.HttpMethod.GET, entity, CatApiResponse[].class);

            CatApiResponse[] catImages = response.getBody();
            if (catImages != null && catImages.length > 0) {
                return catImages[0].getUrl();
            }
        } catch (Exception e) {
            System.err.println("Error fetching cat image: " + e.getMessage());
        }

        return "";
    }

    private String generateDescription(String name, String gender, int age) {
        String trait = PERSONALITY_TRAITS[random.nextInt(PERSONALITY_TRAITS.length)];
        String pronoun = gender.equals("M") ? "He" : "She";

        String baseDescription = name + " is a " + trait + " cat. ";

        if (age <= 2) {
            baseDescription += pronoun + " is still very young and loves to play all day long.";
        } else if (age <= 5) {
            baseDescription += pronoun + " enjoys both playtime and naps, making " +
                    (gender.equals("M") ? "him" : "her") + " the perfect companion.";
        } else if (age <= 10) {
            baseDescription += pronoun + " has a gentle personality and loves cuddles but also appreciates " +
                    (gender.equals("M") ? "his" : "her") + " space.";
        } else {
            baseDescription += pronoun + " is a wise and relaxed cat who enjoys quiet moments and cozy spots.";
        }

        return baseDescription;
    }

    private Cat generateRandomCat() {
        Cat cat = new Cat();
        cat.setName(generateUniqueName());
        cat.setGender(random.nextBoolean() ? "M" : "F");
        cat.setAge(random.nextInt(21));
        cat.setWeight(Math.round((2.5 + random.nextDouble() * 5.5) * 10.0) / 10.0);
        cat.setDescription(generateDescription(cat.getName(), cat.getGender(), cat.getAge()));
        cat.setImage(fetchCatImage());

        return cat;
    }

    public boolean isGenerating() {
        return isGenerating.get();
    }

    @Setter
    @Getter
    private static class CatApiResponse {
        private String id;
        private String url;

    }
}