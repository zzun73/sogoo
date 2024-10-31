package com.ssafy.c107.main.domain.subscribe.dto;

import com.ssafy.c107.main.domain.food.dto.FoodDto;
import lombok.Data;

import java.util.List;

@Data
public class SubscribeWeekDto {
    private String subscribeDate;
    private int subscribeRound;
    private List<FoodDto> foods;
}
