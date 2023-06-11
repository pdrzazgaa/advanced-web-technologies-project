package com.company.project.services;

import com.company.project.dto.SingleRouteDTO;
import com.company.project.exceptions.LineDoesNotExistEx;
import com.company.project.models.Route;
import com.company.project.repositories.LinesRepository;
import com.company.project.repositories.RoutesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RoutesService {
    @Autowired
    RoutesRepository routesRepository;
    @Autowired
    LinesRepository linesRepository;
    public List<SingleRouteDTO> getRoute(String line) throws LineDoesNotExistEx {
        if (!linesRepository.existsById(line)) throw new LineDoesNotExistEx(line);
        Iterable<Route> routes = routesRepository.findAllByLine_Name(line);
        List<SingleRouteDTO> routeDTOList = new ArrayList<>();
        routes.forEach(route -> {
            routeDTOList.add(new SingleRouteDTO(
                    route.getOrderIndex(),
                    route.getLine().getName(),
                    route.getStop().getLatitude(),
                    route.getStop().getLongitude()
            ));
        });
        return routeDTOList;
    }
}
