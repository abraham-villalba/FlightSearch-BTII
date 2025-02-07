package com.flightsearch.backend.model.AirportSearch;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Represents an Airport in Airport Search response.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Airport {
    private String name;
    private String detailedName;
    private String iataCode;
    private Address address;
}
