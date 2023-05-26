package com.company.project.repositories;

import com.company.project.models.Connection;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConnectionsRepository extends CrudRepository<Connection, Long> {
}
