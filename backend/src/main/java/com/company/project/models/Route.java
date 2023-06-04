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
    private int orderIndex;
    @ManyToOne
    private Line line;
    @ManyToOne
    private Stop stop;

}
