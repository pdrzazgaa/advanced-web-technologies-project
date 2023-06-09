package com.company.project.repositories;

import com.company.project.models.FavouritePlace;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FavouritePlacesRepository extends CrudRepository<FavouritePlace, Long> {
    Optional<FavouritePlace> findFavouritePlaceByNameAndUserID(String name, String userID);
    Iterable<FavouritePlace> findFavouritePlaceByUserID(String userID);
    boolean existsFavouritePlaceByIdAndUserID(long id, String userId);
}
