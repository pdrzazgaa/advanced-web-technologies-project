package com.company.project.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
