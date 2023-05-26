package com.company.project.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class FavouritePlaceAlreadyExistsEx extends Exception{
    public FavouritePlaceAlreadyExistsEx(String name) {
        super("Favourite place with name : '"+name+"' already exists.");
        System.out.println("Exception - Favourite place already exists. Name: " + name);
    }
}
