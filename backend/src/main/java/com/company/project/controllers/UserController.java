package com.company.project.controllers;

import com.company.project.exceptions.BadRequestEx;
import com.company.project.exceptions.UserAlreadyExistsEx;
import com.company.project.models.User;
import com.company.project.services.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RequestMapping(name = "/users")
@RestController
public class UserController {
    @Autowired
    UsersService usersService;
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity addUser(@RequestBody User newUser) throws UserAlreadyExistsEx, BadRequestEx {
        usersService.addUser(newUser);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .build();
    }
}
