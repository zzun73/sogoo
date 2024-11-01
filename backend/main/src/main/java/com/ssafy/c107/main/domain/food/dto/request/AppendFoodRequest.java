package com.ssafy.c107.main.domain.food.dto.request;

import com.ssafy.c107.main.domain.food.dto.FoodDataDto;
import lombok.Data;

@Data
public class AppendFoodRequest {
    private FoodDataDto data;
    private String img;
}
