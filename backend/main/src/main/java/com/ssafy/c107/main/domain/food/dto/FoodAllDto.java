package com.ssafy.c107.main.domain.food.dto;

import lombok.Data;

@Data
public class FoodAllDto {
    private Long foodId;
    private String foodName;
    private String foodDescription;
    private int foodPrice;
    private String foodImg;
}
