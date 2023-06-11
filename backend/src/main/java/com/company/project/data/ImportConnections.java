package com.company.project.data;

import com.company.project.exceptions.LineDoesNotExistEx;
import com.company.project.models.*;
import com.company.project.repositories.ConnectionsRepository;
import com.company.project.repositories.LinesRepository;
import com.company.project.repositories.StopsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.time.LocalTime;
import java.util.*;

@Component
@Order(3)
public class ImportConnections implements Importable, CommandLineRunner {
    private static final String CONNECTION_GRAPH_FILENAME = "connection_graph.csv";
    private static final int LINE_INDEX = 3;
    private static final int DEPARTURE_TIME_INDEX = 4;
    private static final int ARRIVAL_TIME_INDEX = 5;
    private static final int DEPARTURE_STOP_INDEX = 6;
    private static final int ARRIVAL_STOP_INDEX = 7;
    private static final int DEPARTURE_STOP_LAT_INDEX = 8;
    private static final int DEPARTURE_STOP_LONG_INDEX = 9;
    private static final int ARRIVAL_STOP_LAT_INDEX = 10;
    private static final int ARRIVAL_STOP_LONG_INDEX = 11;

    @Autowired
    ConnectionsRepository connectionsRepository;
    @Autowired
    LinesRepository linesRepository;
    @Autowired
    StopsRepository stopsRepository;

    @Override
    public void run(String... args) throws Exception {
        this.importFiles();
    }

    @Override
    public boolean sendToSQL(List<String[]> data) {
        Map<String, Stop> stops = new HashMap<>();
        List<Connection> connections = new ArrayList<>();
        List<Line> lines = new ArrayList<>();
        linesRepository.findAll().forEach(lines::add);
        for (String[] row: data){
            try{
                String line = row[LINE_INDEX];
                LocalTime departTime = LocalTime.parse(row[DEPARTURE_TIME_INDEX]);
                LocalTime arrivalTime = LocalTime.parse(row[ARRIVAL_TIME_INDEX]);
                String departStopName = row[DEPARTURE_STOP_INDEX];
                String arrivalStopName = row[ARRIVAL_STOP_INDEX];
                double departStopLat = Double.parseDouble(row[DEPARTURE_STOP_LAT_INDEX]);
                double departStopLong = Double.parseDouble(row[DEPARTURE_STOP_LONG_INDEX]);
                double arrivalStopLat = Double.parseDouble(row[ARRIVAL_STOP_LAT_INDEX]);
                double arrivalStopLong = Double.parseDouble(row[ARRIVAL_STOP_LONG_INDEX]);

                Stop departureStop;
                Stop arrivalStop;

                if (!stops.containsKey(departStopName)) {
                    departureStop = new Stop(departStopName, departStopLat, departStopLong);
                    stops.put(departStopName, departureStop);
                } else {
                    departureStop = stops.get(departStopName);
                }
                if (!stops.containsKey(arrivalStopName)) {
                    arrivalStop = new Stop(arrivalStopName, arrivalStopLat, arrivalStopLong);
                    stops.put(arrivalStopName, arrivalStop);
                } else {
                    arrivalStop = stops.get(arrivalStopName);
                }
                Optional<Line> optionalLine = lines.stream().filter(l -> l.getName().equals(line)).findAny();
                if (optionalLine.isPresent())
                    connections.add(new Connection(departureStop, arrivalStop, optionalLine.get(), departTime, arrivalTime));
                else
                    throw new LineDoesNotExistEx(line);

            } catch (Exception ex){
                System.out.println("Exception during parsing data [ConnectionDTO Graph]");
                System.out.println(ex.getMessage());
                return false;
            }
        }
        if (stopsRepository.count() == 0) {
            stopsRepository.saveAll(stops.values());
            System.out.println("Inserted stops into database");
        } else
            System.out.println("Data already in database [Stops]");
//        Not used - connections breaks
//        connectionsRepository.saveAll(connections);
        return true;
    }

    @Override
    public boolean importFiles() {
        // If database is not empty, we don't send any data
        if (connectionsRepository.count() > 0) {
            System.out.println("Data already in database [Connections]");
            return true;
        }
        List<String[]> data = ImportData.readAllDataAtOnce(CONNECTION_GRAPH_FILENAME);
        if (data == null) return false;
        return this.sendToSQL(data);
    }


}
