package com.company.project.graph;


import com.company.project.models.*;

import java.time.Duration;
import java.time.LocalTime;
import java.util.*;

public class AStarAlgorithm {

    private static final int DEGREE_FOR_KM = 70;
    private static final double MULTIPLIER = DEGREE_FOR_KM * 5;
    private static final int CHANGING_LINE_COST = 30;
    private static final int NOT_GOAL_COST = 30;
    static final String TRANSFER_MODE = "opt";
    static final String MIN_TIME_MODE = "fast";

    public static double run(Stop start, Stop goal, LocalTime time, String criteria, Graph graph) {
        PriorityQueue<NodePair> pq = new PriorityQueue<>();
        Map<Stop, Stop> prevNodes = new HashMap<>();
        Map<Stop, Connection> prevEdges = new HashMap<>();
        Map<Stop, Double> distances = new HashMap<>();
        LocalTime currTime = LocalTime.now();
        Map<Stop, LocalTime> timeOnStop = new HashMap<>();
        Map<Stop, Line> lines = new HashMap<>();

        pq.add(new NodePair(0, start));
        prevNodes.put(start, null);
        prevEdges.put(start, null);
        distances.put(start, 0.0);
        timeOnStop.put(start, currTime);
        lines.put(start, null);

        while (!pq.isEmpty()) {
            NodePair pair = pq.poll();
            Stop current = pair.getStop();

            if (current.equals(goal)) {
                break;
            }

            for (Connection neighborConnection : graph.getGraphDict().get(current)) {
                Stop neighbor = neighborConnection.getArrivalStop();
                double newCost = cost(graph, current, neighborConnection, criteria, goal, distances, timeOnStop, lines);

                if (!distances.containsKey(neighbor) || newCost < distances.get(neighbor)) {
                    distances.put(neighbor, newCost);
                    timeOnStop.put(neighbor, neighborConnection.getArrivalTime());
                    lines.put(neighbor, neighborConnection.getLine());
                    pq.add(new NodePair(newCost, neighbor));
                    prevNodes.put(neighbor, current);
                    prevEdges.put(neighbor, neighborConnection);
                }
            }
        }

        double tripTime = Duration.between(prevEdges.get(goal).getArrivalTime(), currTime).toMinutes();
        List<Connection> connections = createOutput(prevEdges, prevNodes, start, goal);
        Graph.printPath(time, connections, tripTime);
//        TODO Return trip, not only time (maybe something else?)
        return tripTime;
    }

    private static double cost(Graph graph, Stop current, Connection neighborConnection, String criteria, Stop goal, Map<Stop, Double> distances,
                               Map<Stop, LocalTime> timeOnStop, Map<Stop, Line> lines) {
        double nCost = distances.get(current) + Math.abs((Duration.between(timeOnStop.get(current), neighborConnection.getDepartureTime()).getSeconds()) / 60.0);
        nCost += neighborConnection.cost() + manhattanDistance(goal, neighborConnection.getArrivalStop());
        if (criteria.equals(TRANSFER_MODE)) {
            if (lines.get(current) != null && !lines.get(current).equals(neighborConnection.getLine())) {
                nCost += CHANGING_LINE_COST;
            }
            if (!graph.getLines().get(goal).contains(neighborConnection.getLine())) {
                nCost += NOT_GOAL_COST;
            }
        }
        return nCost;
    }

    private static List<Connection> createOutput(Map<Stop, Connection> prevEdges, Map<Stop, Stop> prevNodes, Stop start, Stop goal) {
        List<Connection> connections = new ArrayList<>();
        Stop currentStop = goal;
        while (!currentStop.equals(start)) {
            if (prevEdges.get(currentStop) != null) {
                connections.add(prevEdges.get(currentStop));
            }
            currentStop = prevNodes.get(currentStop);
        }
        Collections.reverse(connections);
        return connections;
    }

    private static double manhattanDistance(Stop a, Stop b) {
        double latitudeDiff = Math.abs(a.getLatitude() - b.getLatitude());
        double longitudeDiff = Math.abs(a.getLongitude() - b.getLongitude());
        return (latitudeDiff + longitudeDiff) * MULTIPLIER;
    }
}
