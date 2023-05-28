package com.company.project.repositories;

import com.company.project.models.Stop;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StopsRepository extends CrudRepository<Stop, Long> {
}
