package com.hkp.TM;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TmApplication {

	public static void main(String[] args) {
		SpringApplication.run(TmApplication.class, args);
		System.out.println("TM Started");
	}

}
