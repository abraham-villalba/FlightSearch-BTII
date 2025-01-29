package com.flightsearch.backend.model.FlightSearch;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FlightEvent {
    private String iataCode;
    private String terminal;
    private LocalDateTime at; // Landing or departure time
}
