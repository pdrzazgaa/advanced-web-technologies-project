package com.company.project.models;


import lombok.*;
import javax.persistence.*;


@Entity
@Table(name="favourite_places")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FavouritePlace {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private double latitude;
    private double longitude;
    @Column(name = "client_id")
    private String clientID;
}
