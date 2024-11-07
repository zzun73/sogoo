package com.ssafy.c107.main.domain.review.dto.response;

import lombok.Data;

import java.util.Map;

@Data
public class FastApiResponse {
    private String text;
    private int predicted_class;
    private double confidence;
    private String class_name;
    private Map<String, Double> probabilities;
}
