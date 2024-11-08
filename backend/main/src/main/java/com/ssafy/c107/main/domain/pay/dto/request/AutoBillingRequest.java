package com.ssafy.c107.main.domain.pay.dto.request;

import lombok.Data;

// 자동 결제
@Data
public class AutoBillingRequest {
    private Long subscribeId; // 구독상품 pk
    private String orderId; // 주문번호 uuid -> 프런트에서 만들어줌
    private String authKey; // Billing Auth
    private String customerKey; // user UUID
}