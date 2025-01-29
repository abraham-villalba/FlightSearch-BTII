package com.flightsearch.backend.model.FlightSearch;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FareDetailsBySegment {
    private String segmentId;
    private String cabin;

    @JsonProperty("class")
    private String className;

    private List<Amenity> amenities;

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    private static class Amenity {
        private String description;
        private Boolean isChargeable;
    }
}


