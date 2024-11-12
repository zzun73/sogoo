package com.ssafy.c107.main.domain.order.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum OrderException {
    ORDER_CREATION_FAILED("주문 생성에 실패했습니다.", HttpStatus.INTERNAL_SERVER_ERROR.value());

    private final String message;
    private final int code;

    OrderException(String message, int code) {
        this.message = message;
        this.code = code;
    }
}