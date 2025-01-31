package com.flightsearch.backend.model.Airline;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Airline {
    private String iataCode;
    private String businessName;
    private String commonName;
}
