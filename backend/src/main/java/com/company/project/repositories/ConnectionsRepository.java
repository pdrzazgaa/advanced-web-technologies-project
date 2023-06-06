package com.company.project.repositories;


import com.company.project.dto.ConnectionProjection;
import com.company.project.models.Connection;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConnectionsRepository extends CrudRepository<Connection, Long> {
    @Query(value =
            "select c.id, c.arrival_time, c.departure_time, c.line_name as line, \n" +
                    "        c.departure_stop_stop_id as departure_stop_id, d.latitude as departure_lat, d.longitude as departure_long, d.name as departure_name,\n" +
                    "        c.arrival_stop_stop_id as arrival_stop_id, a.latitude as arrival_lat, a.longitude as arrival_long, a.name as arrival_name\n" +
                    "        from connections as c\n" +
                    "        join stops a on c.arrival_stop_stop_id = a.stop_id\n" +
                    "        join stops d on d.stop_id = c.departure_stop_stop_id\n" +
                    "                where TIME(DATE_ADD(TIME(?1), INTERVAL 2 HOUR)) > c.departure_time\n" +
                    "                  and c.departure_time > TIME(?1);"
            , nativeQuery = true)
    List<ConnectionProjection> getConnectionByDepartureTimeInTwoHours(String departureTime);

}
