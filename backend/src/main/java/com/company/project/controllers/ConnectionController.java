package com.company.project.controllers;

import com.company.project.dto.ConnectionRouteDTO;
import com.company.project.exceptions.IllegalModeEx;
import com.company.project.exceptions.StopDoesNotFoundEx;
import com.company.project.services.ConnectionsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalTime;
import java.util.List;

@RestController
public class ConnectionController {
    @Autowired
    ConnectionsService connectionsService;
    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value = "/connection", method = RequestMethod.GET)
    public ResponseEntity<List<ConnectionRouteDTO>> getBestConnections(@RequestParam double sourceLat, @RequestParam double sourceLong,
                                                                         @RequestParam double destinationLat, @RequestParam double destinationLong,
                                                                         @RequestParam LocalTime departureTime, @RequestParam String mode)
            throws StopDoesNotFoundEx, IllegalModeEx {
        List<ConnectionRouteDTO> best4Connections = connectionsService.getBestConnections(
                sourceLat, sourceLong, destinationLat, destinationLong, departureTime, mode
        );
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(best4Connections);

    }
}
