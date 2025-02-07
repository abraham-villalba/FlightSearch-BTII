package com.flightsearch.backend.model.FlightSearch;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Location {
    private String cityCode;
    private String countryCode;
    private String name;       
    private String cityName;  
    private String countryName;
}
