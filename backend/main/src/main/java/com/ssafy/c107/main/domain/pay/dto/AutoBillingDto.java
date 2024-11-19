package com.ssafy.c107.main.domain.pay.dto;

import lombok.Builder;
import lombok.Data;

// 구독 결제(자동 결제)에 필요한 DTO
@Data
public class AutoBillingDto {
    private String billingKey; // billing key
    private String customerKey; // user entity UUID
    private String orderId; // UUID ->  직접 생성
    private Integer amount; // 구독 결제 금액
    private String orderName; // 구독 상품 명
    private String customerName; // 구매자 명
    private String customerEmail; // 구독자 이메일

    @Builder
    public AutoBillingDto(String customerKey, String orderId, Integer amount, String orderName, String customerName, String customerEmail) {
        this.customerKey = customerKey;
        this.orderId = orderId;
        this.amount = amount;
        this.orderName = orderName;
        this.customerName = customerName;
        this.customerEmail = customerEmail;
    }
}