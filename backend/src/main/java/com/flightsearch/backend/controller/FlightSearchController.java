package com.flightsearch.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flightsearch.backend.model.DTO.FlightSearchRequestDTO;
import com.flightsearch.backend.service.FlightSearchService;

import reactor.core.publisher.Mono;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/flights")
public class FlightSearchController {

    @Autowired
    FlightSearchService flightService;

    @GetMapping("/search")
    public Mono<String> searchFlights(
        @RequestParam String departureCode,
        @RequestParam String destinationCode,
        @RequestParam String departureDate,
        @RequestParam(required = false) String returnDate,
        @RequestParam Integer numAdults,
        @RequestParam Boolean nonStop
    ) {
        FlightSearchRequestDTO request = new FlightSearchRequestDTO(
            departureCode, 
            destinationCode, 
            departureDate != null ? LocalDate.parse(departureDate, DateTimeFormatter.ISO_DATE) : null,
            returnDate != null ? LocalDate.parse(returnDate, DateTimeFormatter.ISO_DATE) : null, 
            numAdults, 
            nonStop
        );
        return flightService.searchFlights(request);
    }
    
}