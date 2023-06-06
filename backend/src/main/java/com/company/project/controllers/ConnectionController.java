package com.company.project.controllers;

import com.company.project.dto.ConnectionProjection;
import com.company.project.services.ConnectionsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalTime;
import java.util.List;

@RestController
public class ConnectionController {
    @Autowired
    ConnectionsService connectionsService;

    @RequestMapping(value = "/connection", method = RequestMethod.GET)
    public ResponseEntity<List<ConnectionProjection>> getBestConnections(@RequestParam double sourceLat, @RequestParam double sourceLong,
                                                                         @RequestParam double destinationLat, @RequestParam double destinationLong,
                                                                         @RequestParam LocalTime departureTime, @RequestParam String mode){
        List<ConnectionProjection> best4Connections = connectionsService.getBestConnections(
                sourceLat, sourceLong, destinationLat, destinationLong, departureTime, mode
        );
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(best4Connections.subList(0,9));
    }
}