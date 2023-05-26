package com.company.project.models;


import com.company.project.enums.LineType;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "mpk_lines")
public class Line {
    @Id
    private String name;
    private LineType type;
}
