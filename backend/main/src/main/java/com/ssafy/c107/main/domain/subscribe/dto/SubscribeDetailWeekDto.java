package com.ssafy.c107.main.domain.subscribe.dto;

import com.ssafy.c107.main.domain.food.dto.FoodAllDto;
import lombok.Data;

import java.util.List;

@Data
public class SubscribeDetailWeekDto {
    private String subscribeDate;
    private int subscribeRound;
    private List<FoodAllDto> foodData;
}
