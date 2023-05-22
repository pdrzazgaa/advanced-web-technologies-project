package com.company.project.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.JoinColumn;
import javax.persistence.Table;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="Routes")
public class Route {
    private int id;
    @JoinColumn(table = "Lines", name = "name")
    private String line;
    // #TODO Join column with other model
    private Stop stop;
}
