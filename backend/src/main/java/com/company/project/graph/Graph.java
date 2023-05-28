package com.company.project.graph;


import com.company.project.models.*;
import lombok.Getter;

import java.time.Duration;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Getter
public class Graph {
    private final List<Connection> connections;
    private final Map<Stop, List<Connection>> graphDict;
    private final Map<Stop, List<Line>> lines;

    public Graph(List<Connection> connections) {
        this.connections = connections;
        this.graphDict = new HashMap<>();
        this.lines = new HashMap<>();

        for (Connection connection : this.connections) {
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

    public Stop getNode(String name) {
        for (Stop stop : this.graphDict.keySet()) {
            if (stop.getName().equalsIgnoreCase(name)) {
                return stop;
            }
        }
        return null;
    }

    public int countNodes() {
        return this.graphDict.size();
    }

    public List<Stop> getNodes() {
        return new ArrayList<>(this.graphDict.keySet());
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