package com.company.project.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="routes")
public class Route {
    @Id
    private int id;
    // #TODO Join column with other model
    @ManyToOne
    private Line line;
    @ManyToOne
    private Stop stop;
}
