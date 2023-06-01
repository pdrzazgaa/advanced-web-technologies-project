package com.company.project.data;

import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;

import java.io.FileReader;
import java.util.List;

public class ImportData {

    public static List<String[]> readAllDataAtOnce(String file)
    {
        try {
            FileReader filereader = new FileReader(file);

            CSVReader csvReader = new CSVReaderBuilder(filereader)
                    .withSkipLines(1)
                    .build();
            List<String[]> allData = csvReader.readAll();

            for (String[] row : allData) {
                for (String cell : row) {
                    System.out.print(cell + "\t");
                }
                System.out.println();
            }

            return allData;
        }
        catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}
