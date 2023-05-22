package com.company.project.graph;

import java.time.Duration;
import java.time.LocalTime;
import java.util.*;

public class AStarAlgorithm {

    private static final int DEGREE_FOR_KM = 70;
    private static final double MULTIPLIER = DEGREE_FOR_KM * 5;
    private static final int CHANGING_LINE_COST = 30;
    private static final int NOT_GOAL_COST = 30;
    static final String TRANSFER_MODE = "p";
    static final String MIN_TIME_MODE = "t";

    public static double run(Node start, Node goal, LocalTime time, String criteria, Graph graph) {
        PriorityQueue<NodePair> pq = new PriorityQueue<>();
        Map<Node, Node> prevNodes = new HashMap<>();
        Map<Node, Edge> prevEdges = new HashMap<>();
        Map<Node, Double> distances = new HashMap<>();
        LocalTime currTime = LocalTime.now();
        Map<Node, LocalTime> timeOnStop = new HashMap<>();
        Map<Node, String> lines = new HashMap<>();

        pq.add(new NodePair(0, start));
        prevNodes.put(start, null);
        prevEdges.put(start, null);
        distances.put(start, 0.0);
        timeOnStop.put(start, currTime);
        lines.put(start, null);

        while (!pq.isEmpty()) {
            NodePair pair = pq.poll();
            Node current = pair.getNode();

            if (current.equals(goal)) {
                break;
            }

            for (Edge neighborEdge : graph.getGraphDict().get(current)) {
                Node neighbor = neighborEdge.getArrivalStop();
                double newCost = cost(graph, current, neighborEdge, criteria, goal, distances, timeOnStop, lines);

                if (!distances.containsKey(neighbor) || newCost < distances.get(neighbor)) {
                    distances.put(neighbor, newCost);
                    timeOnStop.put(neighbor, neighborEdge.getArrivalTime());
                    lines.put(neighbor, neighborEdge.getLine());
                    pq.add(new NodePair(newCost, neighbor));
                    prevNodes.put(neighbor, current);
                    prevEdges.put(neighbor, neighborEdge);
                }
            }
        }

        double tripTime = Duration.between(prevEdges.get(goal).getArrivalTime(), currTime).toMinutes();
        List<Edge> edges = createOutput(prevEdges, prevNodes, start, goal);
        Graph.printPath(time, edges, tripTime);
        return tripTime;
    }

    private static double cost(Graph graph, Node current, Edge neighborEdge, String criteria, Node goal, Map<Node, Double> distances,
                               Map<Node, LocalTime> timeOnStop, Map<Node, String> lines) {
        double nCost = distances.get(current) + Math.abs((Duration.between(timeOnStop.get(current), neighborEdge.getDepartureTime()).getSeconds()) / 60.0);
        nCost += neighborEdge.cost() + manhattanDistance(goal, neighborEdge.getArrivalStop());
        if (criteria.equals(TRANSFER_MODE)) {
            if (lines.get(current) != null && !lines.get(current).equals(neighborEdge.getLine())) {
                nCost += CHANGING_LINE_COST;
            }
            if (!graph.getLines().get(goal).contains(neighborEdge.getLine())) {
                nCost += NOT_GOAL_COST;
            }
        }
        return nCost;
    }

    private static List<Edge> createOutput(Map<Node, Edge> prevEdges, Map<Node, Node> prevNodes, Node start, Node goal) {
        List<Edge> edges = new ArrayList<>();
        Node currentNode = goal;
        while (!currentNode.equals(start)) {
            if (prevEdges.get(currentNode) != null) {
                edges.add(prevEdges.get(currentNode));
            }
            currentNode = prevNodes.get(currentNode);
        }
        Collections.reverse(edges);
        return edges;
    }

    private static double manhattanDistance(Node a, Node b) {
        double latitudeDiff = Math.abs(a.getLatitude() - b.getLatitude());
        double longitudeDiff = Math.abs(a.getLongitude() - b.getLongitude());
        return (latitudeDiff + longitudeDiff) * MULTIPLIER;
    }
}
