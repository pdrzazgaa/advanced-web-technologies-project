package com.company.project.models;


import com.company.project.enums.LineType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "mpk_lines")
public class Line {
    @Id
    private String name;
    private LineType type;
}
