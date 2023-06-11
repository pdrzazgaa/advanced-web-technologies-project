package com.company.project.dto;

import com.company.project.models.Line;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LineDTO {
    private String line;
    private String type;

    public static LineDTO fromLine(Line origLine){
        return new LineDTO(origLine.getName(), origLine.getType().getTypeString());
    }
}
