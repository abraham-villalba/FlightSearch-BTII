package com.flightsearch.backend.service;

import com.flightsearch.backend.model.DTO.AirlineResponseDTO;

import reactor.core.publisher.Mono;

public interface AirlineService {
    public Mono<AirlineResponseDTO> getAirlineInformation(String iataCodes);
}
