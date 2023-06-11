package com.company.project.services;

import com.company.project.dto.ConnectionProjection;
import com.company.project.dto.ConnectionRouteDTO;
import com.company.project.exceptions.StopDoesNotFoundEx;
import com.company.project.graph.*;
import com.company.project.models.Stop;
import com.company.project.repositories.ConnectionsRepository;
import com.company.project.repositories.StopsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class ConnectionsService {
    private static final String FAST_MODE = "fast";
    private static final String OPTIMAL_MODE = "opt";
    @Autowired
    ConnectionsRepository connectionsRepository;
    @Autowired
    StopsService stopsService;

    public List<ConnectionProjection> getBestConnections(double sourceLat, double sourceLong, double destinationLat,
                                               double destinationLong, LocalTime departureTime, String mode)
                                                throws StopDoesNotFoundEx {
        List<ConnectionRouteDTO> connectionRouteDTOList = new ArrayList<>();
        List<ConnectionProjection> connectionDBs = connectionsRepository.getConnectionByDepartureTimeInFourHours(departureTime.toString());
        Graph graphAI = new Graph(connectionDBs);
        Stop sourceStop = stopsService.findNearestStop(sourceLat, sourceLong);
        Stop destinationStop = stopsService.findNearestStop(destinationLat, destinationLong);;
        AStarAlgorithm.run(sourceStop, destinationStop, departureTime, mode, graphAI);
        return connectionDBs;
    }
}
