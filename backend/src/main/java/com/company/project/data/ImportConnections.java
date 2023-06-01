package com.company.project.data;

import com.company.project.enums.LineType;
import com.company.project.models.*;
import com.company.project.repositories.ConnectionsRepository;
import com.company.project.repositories.LinesRepository;
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

    @Override
    public void run(String... args) throws Exception {
//        this.importFiles();
    }

    /*
    if not startStopName in dictNodes.keys():
    nodeStart = Node(startStopName,
                     float(row[START_STOP_LAT_INDEX]),
    float(row[START_STOP_LON_INDEX])
                    )
    dictNodes[startStopName] = nodeStart
            else:
    nodeStart = dictNodes[startStopName]

            if not endStopName in dictNodes.keys():
    nodeStop = Node(endStopName,
                    float(row[END_STOP_LAT_INDEX]),
    float(row[END_STOP_LON_INDEX])
                    )
    dictNodes[endStopName] = nodeStop
            else:
    nodeStop = dictNodes[endStopName]

            edges.append(
    Edge(
            nodeStart,
            nodeStop,
            str(row[LINE_INDEX]),
                    datetime.strptime(str(row[DEPARTURE_TIME_INDEX]), "%H:%M:%S"),
            datetime.strptime(str(row[ARRIVAL_TIME_INDEX]), "%H:%M:%S")
            )

*/
    @Override
    public boolean sendToSQL(List<String[]> data) {
        Map<String, Stop> stops = new HashMap<>();
        List<Connection> connections = new ArrayList<>();
        List<Line> lines = new ArrayList<>();
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
                double arrivalStopLong = Double.parseDouble(row[ARRIVAL_STOP_LAT_INDEX]);

                Stop departureStop;
                Stop arrivalStop;

                if (!stops.containsKey(departStopName)) {
                    departureStop = new Stop(departStopName, departStopLat, departStopLong);
                    stops.put(departStopName, departureStop);
                } else {
                    departureStop = stops.get(departStopName);
                }
                if (!stops.containsKey(departStopName)) {
                    arrivalStop = new Stop(arrivalStopName, arrivalStopLat, arrivalStopLong);
                    stops.put(arrivalStopName, arrivalStop);
                } else {
                    arrivalStop = stops.get(arrivalStopName);
                }
                Optional<Line> optionalLine = linesRepository.findById(line);
                if (optionalLine.isPresent())
                    connections.add(new Connection(departureStop, arrivalStop, optionalLine.get(), departTime, arrivalTime));
                else
//                    TODO Make exception
                    throw new Exception();

            } catch (Exception ex){
                System.out.println("Exception during parsing data [Connection Graph]");
                System.out.println(ex.getMessage());
                return false;
            }
        }
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
