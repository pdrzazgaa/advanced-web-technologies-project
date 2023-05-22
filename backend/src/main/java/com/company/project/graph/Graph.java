package com.company.project.graph;

import lombok.Getter;

import java.time.Duration;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Getter
public class Graph {
    private final List<Edge> edges;
    private final Map<Node, List<Edge>> graphDict;
    private final Map<Node, List<String>> lines;

    public Graph(List<Edge> edges) {
        this.edges = edges;
        this.graphDict = new HashMap<>();
        this.lines = new HashMap<>();

        for (Edge edge : this.edges) {
            if (this.graphDict.containsKey(edge.getDepartureStop())) {
                this.graphDict.get(edge.getDepartureStop()).add(edge);
            } else {
                List<Edge> nodeEdges = new ArrayList<>();
                nodeEdges.add(edge);
                this.graphDict.put(edge.getDepartureStop(), nodeEdges);
            }

            if (this.lines.containsKey(edge.getDepartureStop())) {
                List<String> nodeLines = this.lines.get(edge.getDepartureStop());
                if (!nodeLines.contains(edge.getLine())) {
                    nodeLines.add(edge.getLine());
                }
            } else {
                List<String> nodeLines = new ArrayList<>();
                nodeLines.add(edge.getLine());
                this.lines.put(edge.getDepartureStop(), nodeLines);
            }

            if (!this.graphDict.containsKey(edge.getArrivalStop())) {
                this.graphDict.put(edge.getArrivalStop(), new ArrayList<>());
            }
        }
    }

    public Node getNode(String name) {
        for (Node node : this.graphDict.keySet()) {
            if (node.getName().equalsIgnoreCase(name)) {
                return node;
            }
        }
        return null;
    }

    public int countNodes() {
        return this.graphDict.size();
    }

    public List<Node> getNodes() {
        return new ArrayList<>(this.graphDict.keySet());
    }

    public static void printPath(LocalTime startTime, List<Edge> path, double distance) {
        Edge prevEdge = null;
        System.out.println("Begin your trip at " + startTime);
        System.out.println("Your stops:");
        for (Edge edge : path) {
            if (prevEdge != null && !prevEdge.getLine().equals(edge.getLine())) {
                int waitingTime = (int) Duration.between(prevEdge.getArrivalTime(), edge.getDepartureTime()).toMinutes();
                System.out.println("TRANSFER - wait " + waitingTime + " minutes");
            }
            System.out.println(edge.getLine() + " | " + edge.getDepartureStop() + " [ " +
                    edge.getDepartureTime() + " ] - " + edge.getArrivalStop() + " [ " + edge.getArrivalTime() + " ]");
            prevEdge = edge;
        }
        System.out.println("Time of the trip: " + (int) distance + " minutes");
    }

}