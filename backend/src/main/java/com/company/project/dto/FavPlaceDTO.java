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
    private String address;

    public FavouritePlace toFavouritePlace(String clientID){
        FavouritePlace favouritePlace = new FavouritePlace();
        favouritePlace.setName(this.getName());
        favouritePlace.setLatitude(this.getLatitude());
        favouritePlace.setLongitude(this.getLongitude());
//        TODO
//        favouritePlace.setUserID(clientID);
        favouritePlace.setAddress(this.getAddress());
        return favouritePlace;
    }
}
