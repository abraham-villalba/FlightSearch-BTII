package com.flightsearch.backend;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.io.IOException;
import java.util.List;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.web.reactive.function.client.WebClient;

import com.flightsearch.backend.exceptions.ClientErrorException;
import com.flightsearch.backend.exceptions.ServerErrorException;
import com.flightsearch.backend.model.Airline.Airline;
import com.flightsearch.backend.model.DTO.AirlineResponseDTO;
import com.flightsearch.backend.service.AirlineService;
import com.flightsearch.backend.service.implementation.AirlineServiceImplementation;

import okhttp3.mockwebserver.MockResponse;
import okhttp3.mockwebserver.MockWebServer;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

public class AirlineSearchServiceTest {
    private MockWebServer mockWebServer;
    private AirlineService airlineService;

    @BeforeEach
    void setUpMockServer() throws IOException {
        mockWebServer = new MockWebServer();
        mockWebServer.start();
        String baseUrl = mockWebServer.url("/").toString();
        WebClient webClient = WebClient.create(baseUrl);
        airlineService = new AirlineServiceImplementation(webClient);
    }

    @AfterEach
    void shutDown() throws IOException {
        mockWebServer.shutdown();
    }

    @Test
    public void shouldReturnAirlineInfoForValidSearchQuery() throws IOException {
        // Set up MockWebServer to return a simulated response
        String mockResponseJson = "{\"data\":[{\"iataCode\":\"VA\",\"businessName\":\"VIRGIN AUSTRALIA INTL\",\"commonName\":\"VIRGIN AUSTRALIA\"}]}";
        mockWebServer.enqueue(new MockResponse()
            .setHeader("Content-Type", "application/json")
            .setBody(mockResponseJson)
        );

        // When: Call the search method
        Mono<AirlineResponseDTO> response = airlineService.getAirlineInformation("VA");

        StepVerifier.create(response)
            .assertNext(r -> {
                List<Airline> airlines = r.getData();
                Airline airline1 = airlines.get(0);
                assertEquals(airline1.getIataCode(), "VA");
                assertEquals(airline1.getBusinessName(), "VIRGIN AUSTRALIA INTL");
                assertEquals(airline1.getCommonName(), "VIRGIN AUSTRALIA");
            })
            .verifyComplete();
    }

    @Test
    void shouldThrowExceptionForInvalidQuery() {
        assertThrows(IllegalArgumentException.class, () -> {
            airlineService.getAirlineInformation(""); 
        });
        assertThrows(IllegalArgumentException.class, () -> {
            airlineService.getAirlineInformation("V"); 
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

        Mono<AirlineResponseDTO> response = airlineService.getAirlineInformation("Unknown");

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

        Mono<AirlineResponseDTO> response = airlineService.getAirlineInformation("Lorem ipsum");

        assertThrows(ServerErrorException.class, () -> {
            response.block(); 
        });
    }
}
