package com.ssafy.c107.main.domain.pay.exception;

import lombok.Getter;

@Getter
public class BillingAuthFailedException extends RuntimeException {
    @Override
    public String getMessage() {
        return PaymentException.BILLING_AUTH_FAILED.getMessage();
    }

    public int getStatus() {
        return PaymentException.BILLING_AUTH_FAILED.getCode();
    }
}
