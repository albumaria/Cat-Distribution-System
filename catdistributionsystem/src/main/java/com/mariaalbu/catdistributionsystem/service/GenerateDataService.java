package com.mariaalbu.catdistributionsystem.service;

import com.mariaalbu.catdistributionsystem.model.Cat;
import com.mariaalbu.catdistributionsystem.model.MischiefRecord;
import com.mariaalbu.catdistributionsystem.model.User;
import com.mariaalbu.catdistributionsystem.repository.ICatRepository;
import com.mariaalbu.catdistributionsystem.repository.IMischiefRecordRepository;
import com.mariaalbu.catdistributionsystem.repository.IUserRepository;
import net.datafaker.Faker;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class GenerateDataService {
    private final IUserRepository userRepository;
    private final CatGeneratorService catGeneratorService;
    private final ICatRepository catRepository;
    private final IMischiefRecordRepository mischiefRecordRepository;

    public GenerateDataService(IUserRepository userRepository, CatGeneratorService catGeneratorService, ICatRepository catRepository, IMischiefRecordRepository mischiefRecordRepository) {
        this.userRepository = userRepository;
        this.catGeneratorService = catGeneratorService;
        this.catRepository = catRepository;
        this.mischiefRecordRepository =mischiefRecordRepository;
    }

    public void generateDataForUsers() {
        Faker faker = new Faker();
        List<User> users = new ArrayList<>();
        Set<String> existingUsernames = userRepository.findAllUsernames();
        Set<String> existingEmails = userRepository.findAllEmails();

        for(int i=0; i< 97281; i++) {
            User user = new User();
            String username = faker.internet().username();

            while(existingUsernames.contains(username)) {
                username = faker.internet().username();
            }

            String email = faker.internet().emailAddress();

            while(existingEmails.contains(email)) {
                email = faker.internet().emailAddress();
            }

            user.setUsername(username);
            user.setEmail(email);

            user.setIsMonitored(false);
            user.setCreatedate(LocalDateTime.now());
            user.setRole("Regular");
            user.setVersion(0L);
            String rawPassword = "password123";
            String hashedPassword = BCrypt.hashpw(rawPassword, BCrypt.gensalt());
            user.setPasswordhash(hashedPassword);

            userRepository.save(user);
        }

    }

    public void generateMischiefRecords() {
        Random random = new Random();

        List<String> mischiefActivities = Arrays.asList(
                "Knocked a glass of water off the table — on purpose.",
                "Unraveled an entire roll of toilet paper.",
                "Climbed the curtains... again.",
                "Stole a piece of chicken off the counter.",
                "Swatted keys under the couch and walked away.",
                "Yelled at 3am for no reason at all.",
                "Took a nap in the clean laundry pile.",
                "Attacked feet under the blanket like they were prey.",
                "Pushed every item off the shelf just to watch it fall.",
                "Opened a drawer and hid inside.",
                "Scratched the couch — right after being told not to.",
                "Darted out the door the moment it opened.",
                "Stared into a corner for 10 minutes and scared everyone.",
                "Knocked over a plant and tracked soil across the house.",
                "Hacked up a hairball — right on the bed.",
                "Pretended not to hear their name when called.",
                "Hid in a box for an ambush attack.",
                "Ran full speed at 2am across the apartment.",
                "Bit a charging cable in half.",
                "Sat on the laptop while it was in use.",
                "Triggered the Roomba and rode it like a boss."
        );

        List<Cat> cats = catRepository.findAll();

        if (cats.isEmpty()) {
            System.out.println("No cats found in the repository. Aborting mischief generation.");
            return;
        }

        for (int i = 0; i < 50000; i++) {
            MischiefRecord record = new MischiefRecord();

            Cat randomCat = cats.get(random.nextInt(cats.size()));
            record.setCat(randomCat);

            record.setDescription(mischiefActivities.get(new Random().nextInt(mischiefActivities.size())));
            record.setSeverity(random.nextInt(10) + 1);
            record.setWas_caught(random.nextBoolean());
            record.setVersion(0L);

            mischiefRecordRepository.save(record);
        }
    }

    public void generateCats() {
        List<Cat> currentCats = new ArrayList<>();

        for(int i=0; i<84000; i++) {
            Cat cat = new Cat();
            cat = catGeneratorService.generateRandomCat();

            currentCats.add(cat);
            if(currentCats.size() >= 1000) {
                this.catRepository.saveAll(currentCats);
                System.out.println("saving..");
                currentCats.clear();
            }
        }

        this.catRepository.saveAll(currentCats);
    }

}
