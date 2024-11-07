package com.ssafy.c107.main.domain.pay.dto;

import lombok.Data;

// 각 주문 항목(Food)에 필요한 DTO
@Data
public class FoodItemDto {
    private Long foodId;
    private Integer count;  // 주문 수량
    private Integer price;  // 개별 음식 가격
}