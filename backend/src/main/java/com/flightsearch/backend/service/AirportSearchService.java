package com.flightsearch.backend.service;

import com.flightsearch.backend.model.DTO.AirportSearchResponseDTO;

import reactor.core.publisher.Mono;

public interface AirportSearchService {
    public Mono<AirportSearchResponseDTO> searchAirport(String query);
}
