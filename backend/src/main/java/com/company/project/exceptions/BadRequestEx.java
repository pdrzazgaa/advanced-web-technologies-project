package com.company.project.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class BadRequestEx extends Exception{
    public BadRequestEx(String message) {
        super(message);
        System.out.println("Exception - Bad Request." + message);
    }
}
