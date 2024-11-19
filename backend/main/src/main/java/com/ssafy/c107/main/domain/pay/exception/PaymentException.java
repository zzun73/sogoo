package com.ssafy.c107.main.domain.pay.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum PaymentException {
    CONFIRM_PAYMENT_FAILED("결제 승인을 실패했습니다.", HttpStatus.BAD_REQUEST.value()),
    BILLING_AUTH_FAILED("카드 등록을 실패했습니다.", HttpStatus.BAD_REQUEST.value()),
    BILLING_CHARGE_FAILED("자동 결제를 실패했습니다.", HttpStatus.BAD_REQUEST.value())
    ;

    private final String message;
    private final int code;

    PaymentException(String message, int code) {
        this.message = message;
        this.code = code;
    }
}