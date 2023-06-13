package com.company.project.graph;


import com.company.project.dto.ConnectionProjection;
import com.company.project.models.*;
import lombok.Getter;

import java.time.Duration;
import java.time.LocalTime;
import java.util.*;

@Getter
public class Graph {
    private final List<Connection> connections;
    private final Map<Stop, List<Connection>> graphDict;
    private final Map<Stop, List<Line>> lines;

    public Graph(List<ConnectionProjection> connectionProjections) {
        this.connections = new ArrayList<>();
        this.graphDict = new HashMap<>();
        this.lines = new HashMap<>();

        for (ConnectionProjection connectionProjection : connectionProjections) {
            Stop arrivalStop = new Stop(connectionProjection.getArrival_name(),
                    connectionProjection.getArrival_lat(), connectionProjection.getArrival_long());
            Stop departureStop = new Stop(connectionProjection.getDeparture_name(),
                    connectionProjection.getDeparture_lat(), connectionProjection.getDeparture_lat());
            Connection connection = new Connection(departureStop, arrivalStop,
                    new Line(connectionProjection.getLine()), connectionProjection.getDeparture_time(),
                    connectionProjection.getArrival_time());

            if (this.graphDict.containsKey(connection.getDepartureStop())) {
                this.graphDict.get(connection.getDepartureStop()).add(connection);
            } else {
                List<Connection> nodeConnections = new ArrayList<>();
                nodeConnections.add(connection);
                this.graphDict.put(connection.getDepartureStop(), nodeConnections);
            }

            if (this.lines.containsKey(connection.getDepartureStop())) {
                List<Line> nodeLines = this.lines.get(connection.getDepartureStop());
                if (!nodeLines.contains(connection.getLine())) {
                    nodeLines.add(connection.getLine());
                }
            } else {
                List<Line> nodeLines = new ArrayList<>();
                nodeLines.add(connection.getLine());
                this.lines.put(connection.getDepartureStop(), nodeLines);
            }

            if (!this.graphDict.containsKey(connection.getArrivalStop())) {
                this.graphDict.put(connection.getArrivalStop(), new ArrayList<>());
            }
        }
    }

    public static List<Connection> getFutureConnections(LocalTime time, List<Connection> allConnections){
        List<Connection> futureConnections = new ArrayList<>();

        for (Connection connection : allConnections) {
            if (!connection.getDepartureTime().isBefore(time))
                futureConnections.add(connection);
        }
        futureConnections.sort((o1, o2) -> (int)Duration.between(o2.getDepartureTime(), o1.getDepartureTime()).toMinutes());
        return futureConnections;
    }

    public static void printPath(LocalTime startTime, List<Connection> path, double distance) {
        Connection prevConnection = null;
        System.out.println("Begin your trip at " + startTime);
        System.out.println("Your stops:");
        for (Connection connection : path) {
            if (prevConnection != null && !prevConnection.getLine().equals(connection.getLine())) {
                int waitingTime = (int) Duration.between(prevConnection.getArrivalTime(), connection.getDepartureTime()).toMinutes();
                System.out.println("TRANSFER - wait " + waitingTime + " minutes");
            }
            System.out.println(connection.getLine() + " | " + connection.getDepartureStop() + " [ " +
                    connection.getDepartureTime() + " ] - " + connection.getArrivalStop() + " [ " + connection.getArrivalTime() + " ]");
            prevConnection = connection;
        }
        System.out.println("Time of the trip: " + (int) distance + " minutes");
    }

}