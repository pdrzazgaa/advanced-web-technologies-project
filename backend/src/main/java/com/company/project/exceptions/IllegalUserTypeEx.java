package com.company.project.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class IllegalUserTypeEx extends Exception{
    public IllegalUserTypeEx() {
        super("Illegal User Type. Internal Error.");
    }
}
