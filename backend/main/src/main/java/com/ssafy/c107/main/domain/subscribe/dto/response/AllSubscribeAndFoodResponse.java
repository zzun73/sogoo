package com.ssafy.c107.main.domain.subscribe.dto.response;

import com.ssafy.c107.main.domain.food.dto.FoodAllSubscribeDto;
import com.ssafy.c107.main.domain.subscribe.dto.SubscribeAllDto;
import lombok.Data;

import java.util.List;

@Data
public class AllSubscribeAndFoodResponse {
    List<SubscribeAllDto> subscribe;
    List<FoodAllSubscribeDto> foods;
}
