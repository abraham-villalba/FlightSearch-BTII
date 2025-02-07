package com.flightsearch.backend.model.FlightSearch;

import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Represents dictionary of Amadeus API response.
 * Used to add further details to the response.
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReferenceData {
    /**
     * Details about the aircraft
     */
    private Map<String,String> aircraft;
    /**
     * Details about flights carriers, like name
     */
    private Map<String,String> carriers;
    /**
     * Details about locations, details described in Location class
     */
    private Map<String, Location> locations;

}
