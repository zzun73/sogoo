package com.ssafy.c107.main.domain.pay.dto;

import lombok.Data;

// 구독용 카드 등록에 필요한 DTO
@Data
public class BillingDto {
    private String customerKey;
    private String successUrl;
    private String failUrl;
}
