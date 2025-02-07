package com.flightsearch.backend.service.implementation;

import java.time.Duration;
import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.Set;
import java.util.Map.Entry;

import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.flightsearch.backend.exceptions.ClientErrorException;
import com.flightsearch.backend.exceptions.ServerErrorException;
import com.flightsearch.backend.model.DTO.FlightSearchRequestDTO;
import com.flightsearch.backend.model.DTO.FlightSearchResponseDTO;
import com.flightsearch.backend.model.FlightSearch.FlightOffer;
import com.flightsearch.backend.model.FlightSearch.Itinerary;
import com.flightsearch.backend.model.FlightSearch.Location;
import com.flightsearch.backend.service.AirportSearchService;
import com.flightsearch.backend.service.FlightSearchService;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Implementation of FlightSearchService that interacts with Amadeus API 
 * to fetch flight-offers information. This service uses WebClient to perform 
 * non-blocking HTTP requests.
 */
@Service
public class FlightSearchServiceImplementation implements FlightSearchService{

    private final WebClient webClient;
    private final AirportSearchService airportSearchService;
    private static final int PAGE_SIZE = 15;
    
    /**
     * Constructs an instance of FlightSearchServiceImplementation.
     *
     * @param webClient the WebClient instance used for making API requests to Amadeus.
     * @param airportSearchService the AirportSearchService used to fill response with more details 
     * like name of Airports from the Amadeus response.
     */
    public FlightSearchServiceImplementation(WebClient webClient, AirportSearchService airportSearchService) {
        this.webClient = webClient;
        this.airportSearchService = airportSearchService;
    }

    /**
     * Searches for flight offers given the request.
     *
     * @param request FlightSearchRequestDTO object with request information.
     * @return a Mono of FlightSearchResponseDTO containing the list of flight offers and more info.
     * @throws IllegalArgumentException if the request is not valid.
     * @throws ClientErrorException if a 4xx error occurs during the API request.
     * @throws ServerErrorException if a 5xx error occurs during the API request.
     */
    @Override
    public Mono<FlightSearchResponseDTO> searchFlights(FlightSearchRequestDTO request){

        validateRequest(request);
        
        return webClient.get()
            .uri(uriBuilder -> uriBuilder
                .path("/v2/shopping/flight-offers")
                .queryParam("originLocationCode", request.getDepartureCode())
                .queryParam("destinationLocationCode", request.getDestinationCode())
                .queryParam("departureDate", request.getDepartureDate())
                .queryParam("returnDate", request.getReturnDate() != null ? request.getReturnDate() : null)
                .queryParam("adults", request.getNumAdults())
                .queryParam("nonStop", request.getNonStop())
                .queryParam("max", 100)
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
            .flatMap(response -> {
                // Sort, paginate, and process flight offers.
                if (request.getSortBy() != null) {
                    String[] sortFields = request.getSortBy().split(",");
                    sortFlights(response.getData(), sortFields);
                }
                paginateFlights(response, request.getPage());
                response.getData().forEach(FlightOffer::processFlightsDetails);

                // Enrich the reference data locations reactively.
                return fillReferenceDataLocations(response);
            });
    }

    /**
     * Validates flight offer request before calling the amadeus API.
     *
     * @param request FlightSearchRequestDTO object with request information.
     * @throws IllegalArgumentException if the request is not valid.
     */
    private void validateRequest(FlightSearchRequestDTO request) {
        if (request.getReturnDate() != null && request.getReturnDate().isBefore(request.getDepartureDate())) {
            throw new IllegalArgumentException("Return date must not be before departure date.");
        }
        if (request.getDepartureDate().isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("Departure date must not be in the past.");
        }

    };

    /**
     * Sorts the flight offer results by the passed parameters.
     *
     * @param request List of flight offers to sort.
     * @param sortByList sort settings used to sort the information "price:order,duration:order", order should be 'asc' or 'desc'
     * @throws IllegalArgumentException if the sorting parameters are invalid
     */
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

    /**
     * Helper method to find the total duration of a flight offer, used to sort offers
     * 
     * @param flight FlightOffer object to get its total duration.
     */
    private static Duration getTotalDuration(FlightOffer flight) {
        return flight.getItineraries().stream()
            .map(Itinerary::getDuration)
            .reduce(Duration.ZERO, Duration::plus);
    }

    /**
     * Helper method to paginate the flight offers, remaining with a subset of data from the response.
     * 
     * @param response FlightSearchResponseDTO object with the list of flight offers
     * @param page  int Used to specify which segment or subset of data to remain with.
     */
    private void paginateFlights(FlightSearchResponseDTO response, int page) {
        List<FlightOffer> flights = response.getData();
        int fromIndex = (page - 1) * PAGE_SIZE;
        int toIndex = Math.min(fromIndex + PAGE_SIZE, flights.size());
        int totalPages = flights.size() / PAGE_SIZE;
        response.getMeta().setCurrentPage(page);
        response.getMeta().setTotalPages(flights.size() % PAGE_SIZE != 0 ? totalPages + 1 : totalPages);

        if (fromIndex >= flights.size()) {
            response.setData(List.of()); // Return empty list if page is out of bounds
        } else {
            response.setData(flights.subList(fromIndex, toIndex));
        }
        response.getMeta().setCurrentPayloadCount(response.getData().size());
    }

    /**
     * Helper method to add more information about the airports of the amadeus response, information like names.
     * 
     * @param response FlightSearchResponseDTO object with the list of flight offers
     */
    private Mono<FlightSearchResponseDTO> fillReferenceDataLocations(FlightSearchResponseDTO response) {
        if (response.getDictionaries() == null ||
            response.getDictionaries().getLocations() == null ||
            response.getDictionaries().getLocations().isEmpty()) {
            return Mono.just(response);
        }
        Set<Entry<String, Location>> locationSet = response.getDictionaries().getLocations().entrySet();
        return Flux.fromIterable(locationSet)
            .concatMap(entry -> {
                String dictKey = entry.getKey();
                Location location = entry.getValue();
                return airportSearchService.getAirport(dictKey, location)
                    .doOnNext(airport -> {
                        // Update the location with the airport details.
                        location.setName(airport.getName());
                        location.setCityName(airport.getAddress().getCityName());
                        location.setCountryName(airport.getAddress().getCountryName());
                    });
            })
            .then(Mono.just(response));
    }
}
