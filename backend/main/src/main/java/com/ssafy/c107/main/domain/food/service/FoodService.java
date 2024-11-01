package com.ssafy.c107.main.domain.food.service;

import com.ssafy.c107.main.domain.food.dto.request.AppendFoodRequest;

public interface FoodService {
    void appendFood(Long storeId,AppendFoodRequest request, String memberRole);
}
