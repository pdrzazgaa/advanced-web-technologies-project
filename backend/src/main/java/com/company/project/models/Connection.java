package com.company.project.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Duration;
import java.time.LocalTime;

@Data
@AllArgsConstructor
@Entity
@NoArgsConstructor
@Table(name = "connections")
public class Connection {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
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

    public Connection(Stop departureStop, Stop arrivalStop, Line line, LocalTime departureTime, LocalTime arrivalTime) {
        this.departureStop = departureStop;
        this.arrivalStop = arrivalStop;
        this.line = line;
        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;
    }

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

