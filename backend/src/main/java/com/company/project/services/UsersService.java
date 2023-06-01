package com.company.project.services;

import com.company.project.exceptions.BadRequestEx;
import com.company.project.exceptions.UserAlreadyExistsEx;
import com.company.project.models.User;
import com.company.project.repositories.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsersService {

    @Autowired
    UsersRepository usersRepository;
    ValueChecker valueChecker = new ValueChecker();

    public void addUser(User newUser) throws UserAlreadyExistsEx, BadRequestEx {
        if (valueChecker.isStringNotCorrect(newUser.getUserID()))
            throw new BadRequestEx("UserID field is empty or null");
        else if (valueChecker.isStringNotCorrect(newUser.getFirstname()))
            throw new BadRequestEx("Firstname field is empty or null");
        else if (valueChecker.isStringNotCorrect(newUser.getLastname()))
            throw new BadRequestEx("Lastname field is empty or null");
        else if (usersRepository.existsById(newUser.getUserID()))
            throw new UserAlreadyExistsEx(newUser.getUserID());
        else
            usersRepository.save(newUser);
    }
}
