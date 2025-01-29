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
public class PriceWithFees extends Price {
    private List<Fee> fees;

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    private static class Fee {
        private Double amount;
        private String type;
    }
}
