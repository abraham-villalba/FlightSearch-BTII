package com.flightsearch.backend.model.FlightSearch;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Itinerary {
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Duration duration;
    private List<Segment> segments;
    private LocalDateTime departureTime;
    private LocalDateTime arrivalTime;
    private Duration totalLayoverDuration;

    public void calculateItineraryDetails() {
        if (segments != null && !segments.isEmpty()) {
            this.departureTime = segments.get(0).getDeparture().getAt();
            this.arrivalTime = segments.get(segments.size() - 1).getArrival().getAt();

            Duration totalLayover = Duration.ZERO;
            for (int i = 0; i < segments.size() - 1; i++) {
                LocalDateTime arrival = segments.get(i).getArrival().getAt();
                LocalDateTime departure = segments.get(i + 1).getDeparture().getAt();
                Duration layoverDuration = Duration.between(arrival, departure);
                System.out.println("Segment id: " + segments.get(i).getId());
                System.out.println("Airport: " + segments.get(i).getArrival().getIataCode());
                System.out.println("Arrived at " + arrival);
                System.out.println(" Departed at " + departure);
                System.out.println("Layover Duration " + layoverDuration.toString());
                totalLayover = totalLayover.plus(layoverDuration);
                System.out.println("Total Itinerary Layover Duration " + totalLayover.toString());
            }
            this.totalLayoverDuration = totalLayover;
            System.out.println("Total Itinerary Layover Duration: " + totalLayoverDuration.toString());
        }
    }

}
