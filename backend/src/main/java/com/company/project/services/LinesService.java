package com.company.project.services;

import com.company.project.dto.LineDTO;
import com.company.project.models.Line;
import com.company.project.repositories.LinesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class LinesService {
    @Autowired
    LinesRepository linesRepository;

    public List<LineDTO> getAllLines(){
        Iterable<Line> linesOriginal = linesRepository.findAll();
        List<LineDTO> linesDTO = new ArrayList<>();
        linesOriginal.forEach(line -> {
            linesDTO.add(LineDTO.fromLine(line));
        });
        return linesDTO;
    }
}
