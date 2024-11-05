package com.ssafy.c107.main.domain.elasticsearch.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FoodInfoDetail {

    private String foodName;
    private int foodPrice;
    private String foodDescription;
}
