package com.company.project.repositories;


import com.company.project.models.Route;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoutesRepository extends CrudRepository<Route, Long> {
}
