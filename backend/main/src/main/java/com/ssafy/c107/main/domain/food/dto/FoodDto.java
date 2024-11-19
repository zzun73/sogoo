package com.ssafy.c107.main.domain.food.dto;

import lombok.Data;

@Data
public class FoodDto {
    private Long foodId;
    private String foodName;
    private String foodImg;
    private String foodDescription;
}
