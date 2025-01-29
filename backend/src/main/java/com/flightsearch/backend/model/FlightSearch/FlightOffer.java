package com.flightsearch.backend.model.FlightSearch;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FlightOffer {

    private String id;
    private List<Itinerary> itineraries;
    private PriceWithFees price;
    private List<TravelerPricings> travelerPricings;

}
