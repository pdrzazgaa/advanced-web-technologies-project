package com.company.project.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class LineDoesNotExistEx extends Exception{
    public LineDoesNotExistEx(String line) {
        super("Line Does Not Exist Exception. No '"+line+"' in database.");
    }
}
