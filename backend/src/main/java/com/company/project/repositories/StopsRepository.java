package com.company.project.repositories;

import com.company.project.models.Stop;
import org.springframework.data.repository.CrudRepository;

public interface StopsRepository extends CrudRepository<Stop, Long> {
}
