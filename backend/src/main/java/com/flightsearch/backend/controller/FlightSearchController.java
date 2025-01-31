package com.flightsearch.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flightsearch.backend.model.DTO.FlightSearchRequestDTO;
import com.flightsearch.backend.model.DTO.FlightSearchResponseDTO;
import com.flightsearch.backend.service.FlightSearchService;

import jakarta.validation.Valid;
import reactor.core.publisher.Mono;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;


@RestController
@CrossOrigin(origins = "http://localhost:8080") 
@RequestMapping("/api/flights")
public class FlightSearchController {

    @Autowired
    FlightSearchService flightService;

    @GetMapping("/search")
    public Mono<FlightSearchResponseDTO> searchFlights(
        @Valid @ModelAttribute FlightSearchRequestDTO request
    ) {
        return flightService.searchFlights(request);
    }
    
}