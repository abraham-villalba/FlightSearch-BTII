package com.flightsearch.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flightsearch.backend.model.DTO.FlightSearchRequestDTO;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/flights")
public class FlightSearchController {

    @GetMapping("/search")
    public String searchFlights(
        @RequestParam String departureCode,
        @RequestParam String destinationCode,
        @RequestParam String departureDate,
        @RequestParam(required = false) String returnDate,
        @RequestParam Integer numAdults,
        @RequestParam Boolean nonStop
    ) {
        LocalDate departureLocalDate = LocalDate.parse(departureDate, DateTimeFormatter.ISO_DATE);
        
        System.out.println("Departure Date: " + departureLocalDate.toString());
        FlightSearchRequestDTO request = new FlightSearchRequestDTO(departureCode, destinationCode, departureLocalDate, null, numAdults, nonStop);
        return new String("Hello World");
    }
    
}