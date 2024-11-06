package com.ssafy.c107.main.domain.pay.dto;

import lombok.Data;

// 구독 결제(자동 결제)에 필요한 DTO
@Data
public class BillingChargeDto {
    private String customerKey; // user UUID
    private String orderId;
    private Integer amount;
    private String orderName;
}