package com.company.project.services;

import com.company.project.dto.FavPlaceDTO;
import com.company.project.dto.FavPlaceIdDTO;
import com.company.project.exceptions.BadRequestEx;
import com.company.project.exceptions.FavouritePlaceAlreadyExistsEx;
import com.company.project.exceptions.FavouritePlaceDoesNotExistEx;
import com.company.project.models.FavouritePlace;
import com.company.project.repositories.FavouritePlacesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class FavouritePlacesService {
    @Autowired
    FavouritePlacesRepository favouritePlacesRepository;

    public List<FavPlaceIdDTO> getFavouritePlacesByClient(String clientID){
        List<FavPlaceIdDTO> favouritePlaceList = new ArrayList<>();
        for (FavouritePlace place : favouritePlacesRepository.findFavouritePlaceByClientID(clientID)){
            favouritePlaceList.add(new FavPlaceIdDTO(place));
        }
        return favouritePlaceList;
    }

    public FavPlaceIdDTO getFavouritePlace(long id)  throws FavouritePlaceDoesNotExistEx{
        if (!favouritePlacesRepository.existsById(id)) throw new FavouritePlaceDoesNotExistEx(id);
        Optional<FavouritePlace> favouritePlace = favouritePlacesRepository.findById(id);
        return new FavPlaceIdDTO(favouritePlace.get());
    }

    public void deleteFavouritePlace(long id) throws FavouritePlaceDoesNotExistEx {
        if (!favouritePlacesRepository.existsById(id)) throw new FavouritePlaceDoesNotExistEx(id);
        favouritePlacesRepository.deleteById(id);
    }

    public FavPlaceIdDTO addFavouritePlace(FavPlaceDTO favPlaceDTO, String clientID) throws FavouritePlaceAlreadyExistsEx, BadRequestEx {
        if (favPlaceDTO.getName().isBlank() || favPlaceDTO.getName().isEmpty()) throw new BadRequestEx("Name field is empty or null.");
        if (favPlaceDTO.getLatitude() < 50 || favPlaceDTO.getLatitude() > 52) throw new BadRequestEx("Invalid latitude value.");
        if (favPlaceDTO.getLongitude() < 16 || favPlaceDTO.getLongitude() > 18) throw new BadRequestEx("Invalid longitude value.");
        if (favouritePlacesRepository.findFavouritePlaceByNameAndClientID(
                favPlaceDTO.getName(), clientID).isPresent()) {
            throw new FavouritePlaceAlreadyExistsEx(favPlaceDTO.getName());
        } else {
            return new FavPlaceIdDTO(favouritePlacesRepository.save(favPlaceDTO.toFavouritePlace(clientID)));
        }
    };
}