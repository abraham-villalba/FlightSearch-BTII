package com.flightsearch.backend.service;

import com.flightsearch.backend.model.DTO.FlightSearchRequestDTO;

import reactor.core.publisher.Mono;

public interface FlightSearchService {
    public Mono<String> searchFlights(FlightSearchRequestDTO request);
}
