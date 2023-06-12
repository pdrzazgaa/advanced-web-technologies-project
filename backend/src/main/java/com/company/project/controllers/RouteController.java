package com.company.project.controllers;

import com.company.project.dto.SingleRouteDTO;
import com.company.project.exceptions.LineDoesNotExistEx;
import com.company.project.exceptions.NoDataEx;
import com.company.project.services.RoutesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/route")
public class RouteController {
    @Autowired
    RoutesService routesService;
    @GetMapping
    public ResponseEntity<List<SingleRouteDTO>> getRoute(@RequestParam String line) throws LineDoesNotExistEx, NoDataEx {
        List<SingleRouteDTO> routeDTOList = routesService.getRoute(line);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(routeDTOList);
    }
}
