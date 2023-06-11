package com.company.project.exceptions;

public class LineDoesNotExistEx extends Exception{
    public LineDoesNotExistEx(String line) {
        super("Line Does Not Exist Exception. No '"+line+"' in database.");
    }
}
