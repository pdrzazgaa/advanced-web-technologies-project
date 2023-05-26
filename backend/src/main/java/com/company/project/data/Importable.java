package com.company.project.data;

import java.util.List;

public interface Importable {

    boolean sendToSQL(List<String[]> data);
    boolean importFiles();

}
