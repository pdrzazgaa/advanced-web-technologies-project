package com.company.project.graph;

import com.company.project.models.Stop;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class NodePair implements Comparable<NodePair> {
    private double priority;
    private Stop stop;

    @Override
    public int compareTo(NodePair o) {
        return (int)(o.priority - this.priority);
    }
}
