package com.company.project.graph;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.Duration;
import java.time.LocalTime;

@Getter
@AllArgsConstructor
public class Edge {
    private Node departureStop;
    private Node arrivalStop;
    private String line;
    private LocalTime departureTime;
    private LocalTime arrivalTime;

    public double cost() {
        if (arrivalTime == null || departureTime == null) {
            return 0;
        } else {
            long seconds = Duration.between(departureTime, arrivalTime).getSeconds();
            return seconds / 60.0;
        }
    }

    @Override
    public String toString() {
        return departureStop.toString() + " " + arrivalStop.toString() + " " + line + " " +
                departureTime.toString() + " " + arrivalTime.toString();
    }
}

