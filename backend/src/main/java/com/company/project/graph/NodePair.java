package com.company.project.graph;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class NodePair implements Comparable<NodePair> {
    private double priority;
    private Node node;

    @Override
    public int compareTo(NodePair o) {
        return (int)(o.priority - this.priority);
    }
}
