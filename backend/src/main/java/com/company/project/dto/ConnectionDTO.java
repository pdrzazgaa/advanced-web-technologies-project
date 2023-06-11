package com.company.project.dto;

import com.company.project.models.Line;
import com.company.project.models.Stop;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ConnectionDTO {
    private StopDTO departureStop;
    private StopDTO arrivalStop;
    private String line;
    private LocalDateTime departureTime;
    private LocalDateTime arrivalTime;
}

