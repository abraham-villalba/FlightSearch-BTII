package com.flightsearch.backend.model.FlightSearch;

import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReferenceData {
    private Map<String,String> aircraft;
    private Map<String,String> carriers;
    private Map<String, Location> locations;

}
