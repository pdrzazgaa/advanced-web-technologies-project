package com.company.project.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.Duration;
import java.time.LocalTime;

@Getter
@AllArgsConstructor
@Entity
@NoArgsConstructor
@Table(name = "connections")
public class Connection {
    @Id
    @GeneratedValue()
    private long id;
    // #TODO Join column with other model
    @ManyToOne()
    private Stop departureStop;
    @ManyToOne()
    private Stop arrivalStop;
    @ManyToOne
    private Line line;
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

