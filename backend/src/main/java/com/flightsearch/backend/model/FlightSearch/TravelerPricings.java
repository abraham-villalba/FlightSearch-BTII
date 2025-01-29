package com.flightsearch.backend.model.FlightSearch;


import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TravelerPricings {
    private String travelerId;
    private String fareOption;
    private Price price;
    private List<FareDetailsBySegment> fareDetailsBySegment;
}
