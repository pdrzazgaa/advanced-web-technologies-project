package com.company.project.data;

import com.company.project.repositories.ConnectionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Order(3)
public class ImportConnections implements Importable, CommandLineRunner {
    private static final String STOP_TIMES_FILENAME = "stop_times.txt";
    private static final int DEPARTURE_TIME_INDEX = 2;
    private static final int ARRIVAL_TIME_INDEX = 1;
    private static final int STOP_ID_INDEX = 3;

    @Autowired
    ConnectionsRepository connectionsRepository;

    @Override
    public void run(String... args) throws Exception {
        this.importFiles();
    }

    @Override
    public boolean sendToSQL(List<String[]> data) {
        return false;
    }

    @Override
    public boolean importFiles() {
        // If database is not empty, we don't send any data
        if (connectionsRepository.count() > 0) {
            System.out.println("Data already in database [Connections]");
            return true;
        }
        List<String[]> data = ImportData.readAllDataAtOnce(STOP_TIMES_FILENAME);
        if (data == null) return false;
        return this.sendToSQL(data);
    }


}
