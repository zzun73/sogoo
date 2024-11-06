package com.ssafy.c107.main.domain.pay.exception;

import lombok.Getter;

@Getter
public class ConfirmPaymentFailedException extends RuntimeException {

    @Override
    public String getMessage() {
        return PaymentException.CONFIRM_PAYMENT_FAILED.getMessage();
    }

    public int getStatus() {
        return PaymentException.CONFIRM_PAYMENT_FAILED.getCode();
    }
}