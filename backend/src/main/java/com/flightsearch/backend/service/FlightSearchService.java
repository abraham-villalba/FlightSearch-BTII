package com.flightsearch.backend.service;

import com.flightsearch.backend.model.DTO.FlightSearchRequestDTO;
import com.flightsearch.backend.model.DTO.FlightSearchResponseDTO;

import reactor.core.publisher.Mono;

public interface FlightSearchService {
    public Mono<FlightSearchResponseDTO> searchFlights(FlightSearchRequestDTO request);
}
