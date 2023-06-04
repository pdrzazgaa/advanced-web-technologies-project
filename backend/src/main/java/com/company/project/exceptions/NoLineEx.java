package com.company.project.exceptions;

public class NoLineEx extends Exception{
    public NoLineEx(String line) {
        super("No Line Exception. No "+line+" in database.");
    }
}
