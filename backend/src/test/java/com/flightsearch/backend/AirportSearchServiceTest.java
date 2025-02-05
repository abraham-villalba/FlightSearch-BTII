package com.flightsearch.backend;

import static org.junit.Assert.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.io.IOException;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.web.reactive.function.client.WebClient;

import com.flightsearch.backend.exceptions.ClientErrorException;
import com.flightsearch.backend.exceptions.ServerErrorException;
import com.flightsearch.backend.model.AirportSearch.Airport;
import com.flightsearch.backend.model.DTO.AirportSearchResponseDTO;
import com.flightsearch.backend.service.AirportSearchService;
import com.flightsearch.backend.service.implementation.AirportSearchServiceImplementation;

import okhttp3.mockwebserver.MockResponse;
import okhttp3.mockwebserver.MockWebServer;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

public class AirportSearchServiceTest {
    private MockWebServer mockWebServer;
    private AirportSearchService airportSearchService;

    @BeforeEach
    void setUpMockServer() throws IOException {
        mockWebServer = new MockWebServer();
        mockWebServer.start();
        String baseUrl = mockWebServer.url("/").toString();
        WebClient webClient = WebClient.create(baseUrl);
        airportSearchService = new AirportSearchServiceImplementation(webClient);
    }

    @AfterEach
    void shutDown() throws IOException {
        mockWebServer.shutdown();
    }

    @Test
    public void shouldReturnAirportsForValidSearchQuery() throws IOException {
        // Set up MockWebServer to return a simulated response
        String mockResponseJson = "{\"data\": [ " +
            "{ \"name\": \"EDWARD L LOGAN INTL\", \"detailedName\": \"BOSTON/MA/US:EDWARD L LOGAN IN\", \"iataCode\": \"BOS\", \"address\": { \"cityName\": \"BOSTON\", \"cityCode\": \"BOS\", \"countryName\": \"UNITED STATES OF AMERICA\", \"countryCode\": \"US\" } }," 
            +
            "{ \"name\": \"MANCHESTER BOSTON RGNL\", \"detailedName\": \"MANCHESTER/NH/US:MANCHESTER BO\",  \"iataCode\": \"MHT\", \"address\": { \"cityName\": \"MANCHESTER\", \"cityCode\": \"MHT\", \"countryName\": \"UNITED STATES OF AMERICA\", \"countryCode\": \"US\", \"stateCode\": \"NH\", \"regionCode\": \"NAMER\" } }]}" 
;
        mockWebServer.enqueue(new MockResponse()
            .setHeader("Content-Type", "application/json")
            .setBody(mockResponseJson)
        );

        // When: Call the search method
        Mono<AirportSearchResponseDTO> response = airportSearchService.searchAirport("Boston");

        StepVerifier.create(response)
            .assertNext(r -> {
                List<Airport> airports = r.getData();
                Airport airport1 = airports.get(0);
                assertEquals(airport1.getIataCode(), "BOS");
                assertEquals(airport1.getName(), "EDWARD L LOGAN INTL");
                assertEquals(airport1.getAddress().getCityName(), "BOSTON");
            })
            .verifyComplete();
    }

    @Test
    void shouldThrowExceptionForEmptyQuery() {
        assertThrows(IllegalArgumentException.class, () -> {
            airportSearchService.searchAirport(""); 
        });
    }

    @Test
    void shouldThrowClientErrorFor4xxResponse() throws IOException {
        // Simulate a 4xx error response
        mockWebServer.enqueue(new MockResponse()
            .setResponseCode(400)
            .setHeader("Content-Type", "application/json")
            .setBody("{\"error\": \"Bad request\"}")
        );

        Mono<AirportSearchResponseDTO> response = airportSearchService.searchAirport("Unknown");

        assertThrows(ClientErrorException.class, () -> {
            response.block(); 
        });
    }

    @Test
    void shouldThrowServerErrorFor5xxResponse() throws IOException {
        // Simulate a 5xx error response
        mockWebServer.enqueue(new MockResponse()
            .setResponseCode(500)
            .setHeader("Content-Type", "application/json")
            .setBody("{\"error\": \"Something happened\"}")
        );

        Mono<AirportSearchResponseDTO> response = airportSearchService.searchAirport("Boston");

        assertThrows(ServerErrorException.class, () -> {
            response.block(); 
        });
    }


}
