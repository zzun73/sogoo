package com.ssafy.c107.main.domain.food.service;

import com.ssafy.c107.main.domain.food.dto.request.AppendFoodRequest;
import com.ssafy.c107.main.domain.food.dto.response.FoodAllResponse;

public interface FoodService {
    void appendFood(Long storeId,AppendFoodRequest request, String memberRole);

    FoodAllResponse findAllFood(Long storeId, String memberRole);

    FoodAllResponse detailFoodAll(Long storeId, String memberRole);
}
