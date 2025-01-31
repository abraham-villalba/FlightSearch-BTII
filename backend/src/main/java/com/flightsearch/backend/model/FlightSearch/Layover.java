package com.flightsearch.backend.model.FlightSearch;

import java.time.Duration;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Layover {
    private String iataCode;
    private Duration duration;
}
