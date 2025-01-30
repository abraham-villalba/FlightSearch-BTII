package com.flightsearch.backend.service.implementation;

import java.time.Duration;
import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;

import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.flightsearch.backend.exceptions.ClientErrorException;
import com.flightsearch.backend.exceptions.ServerErrorException;
import com.flightsearch.backend.model.DTO.FlightSearchRequestDTO;
import com.flightsearch.backend.model.DTO.FlightSearchResponseDTO;
import com.flightsearch.backend.model.FlightSearch.FlightOffer;
import com.flightsearch.backend.model.FlightSearch.Itinerary;
import com.flightsearch.backend.service.FlightSearchService;

import reactor.core.publisher.Mono;

@Service
public class FlightSearchServiceImplementation implements FlightSearchService{

    private final WebClient webClient;

    public FlightSearchServiceImplementation(WebClient webClient) {
        this.webClient = webClient;
    }

    @Override
    public Mono<FlightSearchResponseDTO> searchFlights(FlightSearchRequestDTO request){
        // TODO: Improve performace by adding pagination or streaming responses.

        if (request.getReturnDate() != null && request.getReturnDate().isBefore(request.getDepartureDate())) {
            throw new IllegalArgumentException("Return date must not be before departure date.");
        }
        if (request.getDepartureDate().isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("Departure date must not be in the past.");
        }
        
        return webClient.get()
            .uri(uriBuilder -> uriBuilder
                .path("/v2/shopping/flight-offers")
                .queryParam("originLocationCode", request.getDepartureCode())
                .queryParam("destinationLocationCode", request.getDestinationCode())
                .queryParam("departureDate", request.getDepartureDate())
                .queryParam("returnDate", request.getReturnDate() != null ? request.getReturnDate() : null)
                .queryParam("adults", request.getNumAdults())
                .queryParam("nonStop", request.getNonStop())
                .queryParam("max", 1)
                .queryParam("currencyCode", request.getCurrency().toString())
                .build())
            .retrieve()
            .onStatus(HttpStatusCode::is4xxClientError, response -> 
                response.bodyToMono(String.class) 
                .flatMap(body -> {
                    System.out.println("I received a bad error 4xx");
                    // Handle client error and return Mono.error with custom exception
                    return Mono.error(new ClientErrorException("Client error: " + body));
                })
            )
            .onStatus(HttpStatusCode::is5xxServerError, response -> {
                System.out.println("I received a bad error 5xx");
                return Mono.error(new ServerErrorException("An error has occurred on the remote server..."));
            })
            .bodyToMono(FlightSearchResponseDTO.class)
            .map(response -> {
                if (request.getSortBy() != null) {
                    String[] sortFields = request.getSortBy().split(",");
                    sortFlights(response.getData(), sortFields);
                }
                response.getData().forEach(FlightOffer::processFlightsDetails);
                return response;
            });
    }

    private void sortFlights(List<FlightOffer> flights, String[] sortByList) {
        if (flights == null || flights.isEmpty() || sortByList == null || sortByList.length == 0) {
            return;
        }

        Comparator<FlightOffer> comparator = null;
        for (String sortBy : sortByList) {
            String[] fieldAndOrder = sortBy.split(":");
            if (fieldAndOrder.length != 2) {
                throw new IllegalArgumentException("Invalid sort field: " + fieldAndOrder);
            }
            String field = fieldAndOrder[0].trim();
            String order = fieldAndOrder[1].trim();

            System.out.println("Ordering by: " + field + "\nOrder:" + order);

            Comparator<FlightOffer> fieldComparator = switch (field.toLowerCase()) {
                case "price" -> Comparator.comparing(flight -> flight.getPrice().getTotal());
                case "duration" -> Comparator.comparing(FlightSearchServiceImplementation::getTotalDuration);
                default -> throw new IllegalArgumentException("Invalid sorting parameters: (" + field + ',' + order + ')');
            };
            // Combine comparators
            if ("desc".equalsIgnoreCase(order)) {
                fieldComparator = fieldComparator.reversed();
            }
            comparator = (comparator == null) ? fieldComparator : comparator.thenComparing(fieldComparator);
        }

        flights.sort(comparator);
    }

    private static Duration getTotalDuration(FlightOffer flight) {
        return flight.getItineraries().stream()
            .map(Itinerary::getDuration)
            .reduce(Duration.ZERO, Duration::plus);
    }
}
