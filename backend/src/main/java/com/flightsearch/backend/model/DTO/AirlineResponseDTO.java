package com.flightsearch.backend.model.DTO;

import java.util.List;

import com.flightsearch.backend.model.Airline.Airline;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AirlineResponseDTO {
    private List<Airline> data;
}
