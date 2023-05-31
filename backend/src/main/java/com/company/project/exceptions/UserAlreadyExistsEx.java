package com.company.project.exceptions;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;


@ResponseStatus(HttpStatus.CONFLICT)
public class UserAlreadyExistsEx extends Exception{
    public UserAlreadyExistsEx(String userID) {
        super("User already exists.");
        System.out.println("Exception - User already exists. UserID: " + userID);
    }
}