package com.company.project.models;


import com.company.project.enums.LineType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Table;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "MPKLines")
public class Line {
    private String name;
    private LineType type;
}
