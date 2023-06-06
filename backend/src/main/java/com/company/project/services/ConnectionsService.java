package com.company.project.services;

import com.company.project.dto.ConnectionProjection;
import com.company.project.dto.ConnectionRouteDTO;
import com.company.project.graph.*;
import com.company.project.models.Connection;
import com.company.project.models.Stop;
import com.company.project.repositories.ConnectionsRepository;
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

    public List<ConnectionProjection> getBestConnections(double sourceLat, double sourceLong, double destinationLat,
                                               double destinationLong, LocalTime departureTime, String mode) {
        List<ConnectionRouteDTO> connectionRouteDTOList = new ArrayList<>();
        List<ConnectionProjection> connectionDBs = connectionsRepository.getConnectionByDepartureTimeInFourHours(departureTime.toString());
        Graph graphAI = new Graph(connectionDBs);
        // TODO Find nearest stops
        Stop sourceStop;
        Stop destinationStop;
//        AStarAlgorithm.run();
        return connectionDBs;
    }
}
