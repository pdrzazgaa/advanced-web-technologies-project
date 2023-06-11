package com.company.project.dto;


import com.company.project.models.FavouritePlace;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FavPlaceIdDTO {
    private long id;
    private String name;
    private double latitude;
    private double longitude;
    private String address;

    public FavPlaceIdDTO(FavouritePlace place){
        id = place.getId();
        name = place.getName();
        latitude = place.getLatitude();
        longitude = place.getLongitude();
        address = place.getAddress();
    }
}
