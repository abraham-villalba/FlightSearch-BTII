package com.flightsearch.backend.model.FlightSearch;

import java.time.Duration;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Segment {
    private String id;
    private FlightEvent departure;
    private FlightEvent arrival;
    private String carrierCode;
    
    @JsonProperty("number")
    private String flightNumber;
    
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Duration duration;
    
    private OperatingInformation operating;
    private Aircraft aircraft;
    private Integer numberOfStops;

}
