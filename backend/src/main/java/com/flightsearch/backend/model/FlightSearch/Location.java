package com.flightsearch.backend.model.FlightSearch;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Represents a geographic location used in ReferenceData to describe Airport details
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Location {
    private String cityCode;
    private String countryCode;
    /** Name of the location */
    private String name;       
    private String cityName;  
    private String countryName;
}
