package com.company.project.data;

import com.company.project.models.Stop;
import com.company.project.repositories.StopsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Order(1)
public class ImportStop implements Importable, CommandLineRunner {
    private static final String STOPS_FILENAME = "stops.txt";
    private static final int STOP_ID_INDEX = 0;
    private static final int NAME_INDEX = 2;
    private static final int LATITUDE_INDEX = 3;
    private static final int LONGITUDE_INDEX = 4;

    @Autowired
    private StopsRepository stopsRepository;
    @Override
    public void run(String... args) throws Exception {
        this.importFiles();
    }

    @Override
    public boolean importFiles(){
        // If database is not empty, we don't send any data
        if (stopsRepository.count() > 0) return true;
        List<String[]> data = ImportData.readAllDataAtOnce(STOPS_FILENAME);
        if (data == null) return false;
        return this.sendToSQL(data);
    }

    @Override
    public boolean sendToSQL(List<String[]> data) {
        for (String[] row: data){
            try{
            Stop newStop = new Stop(
                    Long.parseLong(row[STOP_ID_INDEX]),
                    row[NAME_INDEX],
                    Double.parseDouble(row[LATITUDE_INDEX]),
                    Double.parseDouble(row[LONGITUDE_INDEX]));
                    stopsRepository.save(newStop);
            } catch (Exception ex){
                System.out.println("Exception during parsing data [Stops]");
                System.out.println(ex.getMessage());
                return false;
            }
        }
        return true;
    }
}
