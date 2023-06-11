package com.company.project.dto;


import java.time.LocalTime;

public interface ConnectionProjection {
    int getId();
    LocalTime getArrival_time();
    LocalTime getDeparture_time();
    String getLine();
    int getDeparture_stop_id();
    double getDeparture_lat();
    double getDeparture_long();
    String getDeparture_name();
    int getArrival_stop_id();
    double getArrival_lat();
    double getArrival_long();
    String getArrival_name();

}
