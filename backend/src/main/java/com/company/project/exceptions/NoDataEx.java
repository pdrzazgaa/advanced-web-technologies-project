package com.company.project.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_IMPLEMENTED)
public class NoDataEx extends Exception{
    public NoDataEx(String line) {
        super("No Data Exception. No data for line: " + line);
    }
}
