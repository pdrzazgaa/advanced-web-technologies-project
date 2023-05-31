package com.company.project.data;

import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Order(4)
public class ImportRoutes implements Importable{
    @Override
    public boolean sendToSQL(List<String[]> data) {
        return false;
    }

    @Override
    public boolean importFiles() {
        return false;
    }
}
