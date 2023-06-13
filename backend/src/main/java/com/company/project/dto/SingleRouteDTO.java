package com.company.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SingleRouteDTO {
    private int index;
    private String stopName;
    private String line;
    private double latitude;
    private double longitude;
}
