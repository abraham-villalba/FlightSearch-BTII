package com.flightsearch.backend.model.FlightSearch;

import java.time.Duration;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Itinerary {
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Duration duration;
    private List<Segment> segments;

}
