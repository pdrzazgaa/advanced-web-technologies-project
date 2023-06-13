package com.company.project.services;

import com.company.project.dto.ConnectionDTO;
import com.company.project.dto.ConnectionProjection;
import com.company.project.dto.ConnectionRouteDTO;
import com.company.project.dto.StopDTO;
import com.company.project.exceptions.IllegalModeEx;
import com.company.project.exceptions.StopDoesNotFoundEx;
import com.company.project.graph.*;
import com.company.project.models.Connection;
import com.company.project.models.Stop;
import com.company.project.repositories.ConnectionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
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

    public ConnectionRouteDTO getBestConnection(Stop sourceStop, Stop destinationStop,
                                                LocalTime departureTime, String mode, Graph graphAI) {
        List<ConnectionDTO> connectionDTOList = new ArrayList<>();
        List<Connection> results = AStarAlgorithm.run(sourceStop, destinationStop, departureTime, mode, graphAI);
        results.forEach(r -> connectionDTOList.add(new ConnectionDTO(
                StopDTO.toStopDTO(r.getDepartureStop()),
                StopDTO.toStopDTO(r.getArrivalStop()),
                r.getLine().getName(),
                r.getDepartureTime().atDate(LocalDate.now()),
                r.getArrivalTime().atDate(LocalDate.now()))));
        ConnectionRouteDTO connectionRouteDTO = new ConnectionRouteDTO(
                connectionDTOList.get(0).getDepartureTime(),
                connectionDTOList.get(connectionDTOList.size() - 1).getArrivalTime(),
                connectionDTOList
        );
        return connectionRouteDTO;
    }

    public List<ConnectionRouteDTO> getBestConnections(double sourceLat, double sourceLong, double destinationLat,
                                                       double destinationLong, LocalTime departureTime, String mode)
            throws StopDoesNotFoundEx, IllegalModeEx {
        if (!mode.equals(FAST_MODE) && !mode.equals(OPTIMAL_MODE)) throw new IllegalModeEx();

        List<ConnectionProjection> connectionDBs = connectionsRepository.getConnectionByDepartureTimeInTwoHours(departureTime.toString());
        Graph graphAI = new Graph(connectionDBs);
        Stop sourceStop = stopsService.findNearestStop(sourceLat, sourceLong);
        Stop destinationStop = stopsService.findNearestStop(destinationLat, destinationLong);

        List<ConnectionRouteDTO> best4Connections = new ArrayList<>();
        best4Connections.add(getBestConnection(sourceStop, destinationStop, departureTime, mode, graphAI));
        best4Connections.add(getBestConnection(sourceStop, destinationStop,
                best4Connections.get(0).getDepartureTime().toLocalTime().plusMinutes(1),
                mode, graphAI));
        best4Connections.add(getBestConnection(sourceStop, destinationStop,
                best4Connections.get(1).getDepartureTime().toLocalTime().plusMinutes(1),
                mode, graphAI));
        best4Connections.add(getBestConnection(sourceStop, destinationStop,
                best4Connections.get(2).getDepartureTime().toLocalTime().plusMinutes(1),
                mode, graphAI));
        return best4Connections;
    }
}

