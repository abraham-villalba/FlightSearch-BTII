package com.flightsearch.backend.model.DTO;

import java.util.List;

import com.flightsearch.backend.model.FlightSearch.FlightOffer;
import com.flightsearch.backend.model.FlightSearch.Metadata;
import com.flightsearch.backend.model.FlightSearch.ReferenceData;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * DTO for flight offers search response data.
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FlightSearchResponseDTO {
    private Metadata meta;
    private List<FlightOffer> data;
    private ReferenceData dictionaries;
}
