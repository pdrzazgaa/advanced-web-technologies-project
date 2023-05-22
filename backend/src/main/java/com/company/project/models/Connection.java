package com.company.project.models;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.Table;
import java.time.Duration;
import java.time.LocalTime;

@Getter
@AllArgsConstructor
@Table(name = "Connections")
public class Connection {
    // #TODO Join column with other model
// @JoinColumn(table = "Stops", name = "")
    private Stop departureStop;
    // #TODO Join column with other model
    private Stop arrivalStop;
    @JoinColumn(table = "Lines", name = "name")
    private String line;
    @Column(name = "departure_time")
    private LocalTime departureTime;
    @Column(name = "arrival_time")
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

