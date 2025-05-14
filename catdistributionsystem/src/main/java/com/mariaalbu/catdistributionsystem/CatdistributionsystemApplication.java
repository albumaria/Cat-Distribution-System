package com.mariaalbu.catdistributionsystem;

import com.mariaalbu.catdistributionsystem.service.GenerateDataService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;


@SpringBootApplication
@EnableScheduling
public class CatdistributionsystemApplication {

	@Autowired
	private GenerateDataService generateDataService;

	public static void main(String[] args) {
		SpringApplication.run(CatdistributionsystemApplication.class, args);
	}

	@PostConstruct
	public void generateDataForUsers() {
		//generateDataService.generateCats();
	}
}
