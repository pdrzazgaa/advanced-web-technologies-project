package com.company.project.enums;

import java.util.ArrayList;
import java.util.Arrays;

public enum LineType {

    normal_tram, normal_bus, periodic_bus, periodic_tram,
    suburban_bus, express_bus, special_bus, special_tram,
    zoned_bus, night_bus, unknown;

    private static final String BUS = "bus";
    private static final String TRAM = "tram";

    public String getTypeString() {
        ArrayList<LineType> busTypes = new ArrayList<>
                (Arrays.asList(normal_bus, periodic_bus, suburban_bus, express_bus, special_bus, zoned_bus, night_bus));
        if (busTypes.contains(this))
            return BUS;
        else
            return TRAM;
    }
}
