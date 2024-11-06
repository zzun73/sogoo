package com.ssafy.c107.main.domain.pay.dto;

import lombok.Data;

// 일반 결제에 필요한 DTO
@Data
public class PayDto {
    private String paymentKey;
    private String orderId;
    private Integer amount;
}
