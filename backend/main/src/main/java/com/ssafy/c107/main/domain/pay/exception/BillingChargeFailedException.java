package com.ssafy.c107.main.domain.pay.exception;

import lombok.Getter;

@Getter
public class BillingChargeFailedException extends RuntimeException {

    @Override
    public String getMessage() {
        return PaymentException.BILLING_CHARGE_FAILED.getMessage();
    }

    public int getStatus() {
        return PaymentException.BILLING_CHARGE_FAILED.getCode();
    }
}
