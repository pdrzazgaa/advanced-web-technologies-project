package com.company.project.models;

import lombok.*;

import javax.persistence.*;

@Data
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
