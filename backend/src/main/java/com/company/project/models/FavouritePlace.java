package com.company.project.models;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="FavouritePlaces")
public class FavouritePlace {
    @Id
    @GeneratedValue
    private long id;
    private String name;
    private double latitude;
    private double longitude;
    @Column(name = "client_id")
    private String clientID;
}
