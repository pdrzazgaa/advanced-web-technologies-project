package com.company.project.repositories;

import com.company.project.models.Stop;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StopsRepository extends CrudRepository<Stop, Long> {
     Iterable<Stop> findStopsByNameContainsIgnoreCase(String nameFilter);
     @Query(value = """
             select stop_id, latitude, longitude, name from 
             (select stop_id, latitude, longitude, name, 
             abs(latitude - ?1)+abs(longitude - ?2) as distance 
             from stops order by distance limit 1) as s"""
             , nativeQuery = true)
     Optional<Stop> findNearestStop(double latitude, double longitude);
}
