package com.flightsearch.backend.model.FlightSearch;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Metadata {
    private Integer count;
    private Integer totalPages;
    private Integer currentPage;
    private Integer currentPayloadCount;
}
