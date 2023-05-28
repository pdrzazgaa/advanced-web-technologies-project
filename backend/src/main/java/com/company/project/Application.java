package com.company.project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
//@EntityScan("com.company.project.models")
//@ComponentScan(basePackages = { "com.company.project.*" })
//@EnableJpaRepositories("com.company.project.repositories")
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

}
