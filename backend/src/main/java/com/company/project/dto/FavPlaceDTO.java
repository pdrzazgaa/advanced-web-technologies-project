package com.company.project.dto;

import com.company.project.models.FavouritePlace;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Setter
public class FavPlaceDTO {
    private String name;
    private double latitude;
    private double longitude;

    public FavouritePlace toFavouritePlace(String clientID){
        FavouritePlace favouritePlace = new FavouritePlace();
        favouritePlace.setName(favouritePlace.getName());
        favouritePlace.setLatitude(favouritePlace.getLatitude());
        favouritePlace.setLongitude(favouritePlace.getLongitude());
        favouritePlace.setClientID(clientID);
        return favouritePlace;
    }
}
