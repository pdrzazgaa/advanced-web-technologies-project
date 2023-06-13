package com.company.project.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class IllegalModeEx extends Exception{
    public IllegalModeEx() {
        super("Illegal Mode Exception. Required 'fast' or 'opt'.");
    }
}
