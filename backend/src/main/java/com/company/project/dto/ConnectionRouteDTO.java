package com.company.project.dto;
;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ConnectionRouteDTO {
    private LocalDateTime departureTime;
    private LocalDateTime arrivalTime;
    private List<ConnectionDTO> path;
}
