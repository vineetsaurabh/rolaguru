package com.rolaface;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = { "com.rolaface.controllers", "com.rolaface.services",
		"com.rolaface.config" })
@EntityScan("com.rolaface.entities")
@EnableJpaRepositories("com.rolaface.repositories")
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

}