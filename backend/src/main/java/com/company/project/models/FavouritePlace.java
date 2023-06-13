package com.company.project.models;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


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
    private String address;
//    @Column(name = "user_id")
//    @JoinColumn(name = "user_id")
    private String userID;
}
