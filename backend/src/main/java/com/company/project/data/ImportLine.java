package com.company.project.data;


import com.company.project.enums.LineType;
import com.company.project.models.Line;
import com.company.project.repositories.LinesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Order(2)
public class ImportLine implements Importable, CommandLineRunner {
    private static final String ROUTES_FILENAME = "routes.txt";
    private static final int ROUTE_ID_INDEX = 0;
    private static final int LINE_TYPE_INDEX = 6;

    @Autowired
    LinesRepository linesRepository;

    @Override
    public void run(String... args) throws Exception {
        this.importFiles();
    }

    @Override
    public boolean sendToSQL(List<String[]> data) {
        for (String[] row: data){
            try{
                int line_type_id = Integer.parseInt(row[LINE_TYPE_INDEX]);
                LineType vehicleType = getLineType(line_type_id);
                Line newLine = new Line(
                        row[ROUTE_ID_INDEX],
                        vehicleType);
                linesRepository.save(newLine);
            } catch (Exception ex){
                System.out.println("Exception during parsing data [Stops]");
                System.out.println(ex.getMessage());
                return false;
            }
        }
        return true;
    }

    @Override
    public boolean importFiles() {
        // If database is not empty, we don't send any data
        if (linesRepository.count() > 0) {
            System.out.println("Data already in database [MPK Lines]");
            return true;
        }
        List<String[]> data = ImportData.readAllDataAtOnce(ROUTES_FILENAME);
        if (data == null) return false;
        return this.sendToSQL(data);
    }

    //    30,"Normalna autobusowa"
    //    31,"Normalna tramwajowa"
    //    32,"Okresowa autobusowa"
    //    33,"Okresowa tramwajowa"
    //    34,"Podmiejska autobusowa"
    //    35,"Pospieszna autobusowa"
    //    37,"Specjalna autobusowa"
    //    38,"Specjalna tramwajowa"
    //    39,"Strefowa autobusowa"
    //    40,"Nocna autobusowa"


    private LineType getLineType(int index){
        switch (index){
            case 30 ->{
                return LineType.normal_bus;
            }
            case 31 ->{
                return LineType.normal_tram;
            }
            case 32 ->{
                return LineType.periodic_bus;
            }
            case 33 ->{
                return LineType.periodic_tram;
            }
            case 34 ->{
                return LineType.suburban_bus;
            }
            case 35 ->{
                return LineType.express_bus;
            }
            case 37 ->{
                return LineType.special_bus;
            }
            case 38 ->{
                return LineType.special_tram;
            }
            case 39 ->{
                return LineType.zoned_bus;
            }
            case 40 ->{
                return LineType.night_bus;
            }
            default ->{
                return LineType.unknown;
            }
        }
    }
}
