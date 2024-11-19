package com.ssafy.c107.main.domain.pay.dto;

import lombok.Data;

import java.util.List;

// 일반 결제에 필요한 DTO
@Data
public class PayDto {
    private String paymentKey;
    private String orderId;
    private Integer amount;
    private Long storeId; // 결제 대상 가게 ID
    private List<FoodItemDto> foodItems; // 주문 항목 리스트
}
