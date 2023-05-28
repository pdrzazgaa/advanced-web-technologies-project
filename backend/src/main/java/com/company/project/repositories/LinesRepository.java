package com.company.project.repositories;

import com.company.project.models.Line;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LinesRepository extends CrudRepository<Line, String> {
}
