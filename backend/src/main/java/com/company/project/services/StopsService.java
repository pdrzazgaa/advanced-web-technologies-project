package com.company.project.services;

import com.company.project.dto.StopDTO;
import com.company.project.models.Stop;
import com.company.project.repositories.StopsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class StopsService {
    @Autowired
    StopsRepository stopsRepository;
    public List<StopDTO> getStops(String nameFilter){
        Iterable<Stop> stopList = stopsRepository.findStopsByNameContainsIgnoreCase(nameFilter);
        List<StopDTO> stopDTOList = new ArrayList<>();
        stopList.forEach(stop -> {
            stopDTOList.add(new StopDTO(
                    stop.getName(),
                    stop.getLatitude(),
                    stop.getLongitude()
            ));
        });
        return stopDTOList;
    }

    public Stop findNearestStop(double latitude, double longitude){
       return null;
    }
}
