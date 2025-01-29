package com.flightsearch.backend.model.FlightSearch;

import com.flightsearch.backend.model.enums.Currency;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Price {
    private Double total;
    private Double base;
    private Currency currency;
}
