package com.ssafy.c107.main.domain.food.dto.response;

import com.ssafy.c107.main.domain.food.dto.FoodAllDto;
import lombok.Data;

import java.util.List;

@Data
public class FoodAllResponse {
    private List<FoodAllDto> foods;
}
