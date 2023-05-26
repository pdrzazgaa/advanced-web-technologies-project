package com.company.project.services;

import com.company.project.dto.FavPlaceDTO;
import com.company.project.dto.FavPlaceIdDTO;
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

    public List<FavPlaceIdDTO> getFavouritePlaces(){
        List<FavPlaceIdDTO> favouritePlaceList = new ArrayList<>();
        for (FavouritePlace place : favouritePlacesRepository.findAll()){
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

    public FavPlaceIdDTO addFavouritePlace(FavPlaceDTO favPlaceDTO, String clientID) throws FavouritePlaceAlreadyExistsEx {
        if (favouritePlacesRepository.findFavouritePlaceByNameAndClientID(
                favPlaceDTO.getName(), clientID).isPresent()) {
            throw new FavouritePlaceAlreadyExistsEx(favPlaceDTO.getName());
        } else {
             return new FavPlaceIdDTO(favouritePlacesRepository.save(favPlaceDTO.toFavouritePlace(clientID)));
        }
    };
}
