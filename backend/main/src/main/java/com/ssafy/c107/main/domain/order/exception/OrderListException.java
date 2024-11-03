package com.ssafy.c107.main.domain.order.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum OrderListException {
    ORDER_LIST_NOT_FOUND_EXCEPTION("해당 주문을 찾지 못했습니다.", HttpStatus.NOT_FOUND.value());

    private final String message;
    private final int code;

    OrderListException(String message, int code) {
        this.message = message;
        this.code = code;
    }
}
