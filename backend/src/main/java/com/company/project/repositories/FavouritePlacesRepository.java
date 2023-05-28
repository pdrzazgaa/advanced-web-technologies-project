package com.company.project.repositories;

import com.company.project.models.FavouritePlace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FavouritePlacesRepository extends JpaRepository<FavouritePlace, Long> {
    Optional<FavouritePlace> findFavouritePlaceByNameAndClientID(String name, String clientID);
    Iterable<FavouritePlace> findFavouritePlaceByClientID(String clientID);
}
