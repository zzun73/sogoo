package com.ssafy.c107.main.domain.pay.dto.response;

import lombok.Data;

@Data
public class BillingResponse {
    private String mId;
    private String customerKey;
    private String authenticatedAt;
    private String method;
    private String billingKey;
    private CardInfo card;

    @Data
    public static class CardInfo {
        private String issuerCode;
        private String acquirerCode;
        private String number;
        private String cardType;
        private String ownerType;
    }

    private String cardCompany;
    private String cardNumber;
}
