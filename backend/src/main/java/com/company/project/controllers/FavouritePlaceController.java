package com.company.project.controllers;


import com.company.project.dto.*;
import com.company.project.exceptions.*;
import com.company.project.security.GoogleUser;
import com.company.project.services.FavouritePlacesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RequestMapping("/favourite-places")
@RestController
public class FavouritePlaceController {
    @Autowired
    FavouritePlacesService favouritePlacesService;

    @RequestMapping(method = RequestMethod.GET)
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<FavPlaceIdDTO>> getFavouritePlacesByClient(Authentication authentication) throws IllegalUserTypeEx {
        System.out.println("... called getFavouritePlaces");
        String userId;
        try {
            GoogleUser user = (GoogleUser) authentication.getPrincipal();
            userId = user.getUserId();
        } catch (Exception e){
            throw new IllegalUserTypeEx();
        }
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(favouritePlacesService.getFavouritePlacesByClient(userId));
    }

    @RequestMapping(value = "/{id}",method = RequestMethod.DELETE)
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity deleteFavouritePlace(Authentication authentication, @PathVariable long id) throws FavouritePlaceDoesNotExistEx, IllegalUserTypeEx {
        System.out.println("... called deleteFavouritePlace");
        String userId;
        try {
            GoogleUser user = (GoogleUser) authentication.getPrincipal();
            userId = user.getUserId();
        } catch (Exception e){
            throw new IllegalUserTypeEx();
        }
        favouritePlacesService.deleteFavouritePlace(id, userId);
        return ResponseEntity.noContent().build();
    }

    @RequestMapping(method = RequestMethod.POST)
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity addFavouritePlace(Authentication authentication, @RequestBody FavPlaceDTO favPlaceDTO)
            throws FavouritePlaceAlreadyExistsEx, BadRequestEx, IllegalUserTypeEx {
        System.out.println("... called addFavouritePlace");
        String userId;
        try {
            GoogleUser user = (GoogleUser) authentication.getPrincipal();
            userId = user.getUserId();
        } catch (Exception e){
            throw new IllegalUserTypeEx();
        }
        favouritePlacesService.addFavouritePlace(favPlaceDTO, userId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
