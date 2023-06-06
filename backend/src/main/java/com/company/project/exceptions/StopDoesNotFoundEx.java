package com.company.project.exceptions;

public class StopDoesNotFoundEx extends Exception{
    public StopDoesNotFoundEx(double latitude, double longitude) {
        super("Stop Does Not Found Exception. No stop for coordinates"+latitude+
                ", "+longitude+" in database.");
    }
}
