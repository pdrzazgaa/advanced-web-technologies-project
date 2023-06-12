package com.company.project.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class StopDoesNotFoundEx extends Exception{
    public StopDoesNotFoundEx(double latitude, double longitude) {
        super("Stop Does Not Found Exception. No stop for coordinates"+latitude+
                ", "+longitude+" in database.");
    }
}
