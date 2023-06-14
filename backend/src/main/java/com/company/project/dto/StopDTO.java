package com.company.project.dto;

import com.company.project.models.Stop;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StopDTO {
    private String name;
    private double latitude;
    private double longitude;

    public static StopDTO toStopDTO(Stop stop){
        return new StopDTO(stop.getName(), stop.getLatitude(), stop.getLongitude());
    }
}
