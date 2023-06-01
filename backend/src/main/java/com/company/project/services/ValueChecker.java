package com.company.project.services;

public class ValueChecker {

    public boolean isStringNotCorrect(String value){
        return value == null || value.isEmpty() || value.isBlank();
    }

}
