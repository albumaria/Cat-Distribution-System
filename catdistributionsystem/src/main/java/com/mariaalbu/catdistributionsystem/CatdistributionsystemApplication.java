package com.mariaalbu.catdistributionsystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;


@SpringBootApplication
@EnableScheduling
public class CatdistributionsystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(CatdistributionsystemApplication.class, args);
	}

}
