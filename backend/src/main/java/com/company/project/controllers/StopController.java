package com.company.project.controllers;

import com.company.project.dto.StopDTO;
import com.company.project.services.StopsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/stops")
public class StopController {
    @Autowired
    StopsService stopsService;
    @GetMapping
    public ResponseEntity<List<StopDTO>> getStops(@RequestParam String nameFilter){
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(stopsService.getStops(nameFilter));
    }
}
