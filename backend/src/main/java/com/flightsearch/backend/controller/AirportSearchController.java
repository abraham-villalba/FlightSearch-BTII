package com.flightsearch.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flightsearch.backend.model.DTO.AirportSearchResponseDTO;
import com.flightsearch.backend.service.AirportSearchService;

import reactor.core.publisher.Mono;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/airports")
public class AirportSearchController {

    @Autowired
    private AirportSearchService airportSearchService;

    @GetMapping("/search")
    public ResponseEntity<Mono<AirportSearchResponseDTO>> getMethodName(@RequestParam String query) {
        return new ResponseEntity<Mono<AirportSearchResponseDTO>>(airportSearchService.searchAirport(query), HttpStatus.OK);
    }
    

}
