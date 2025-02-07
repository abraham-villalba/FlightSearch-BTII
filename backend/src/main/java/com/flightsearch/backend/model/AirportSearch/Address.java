package com.flightsearch.backend.model.AirportSearch;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Represents a geographic location of an Airport in Airport Search response.
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Address {
    private String cityName;
    private String cityCode;
    private String countryName;
    private String countryCode;
}
