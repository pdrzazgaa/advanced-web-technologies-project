package com.company.project.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class FavouritePlaceDoesNotExistEx extends Exception{
    public FavouritePlaceDoesNotExistEx(long id) {
        super("Favourite place does not exist. ID = " + id);
        System.out.println("Exception - Favourite place does not exist. ID = " + id);
    }
}
