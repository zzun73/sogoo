package com.ssafy.c107.main.domain.subscribe.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum SubscribeException {
    SUBSCRIBE_NOT_FOUND("구독 상품을 찾을 수 없습니다.", HttpStatus.NOT_FOUND.value());

    private final String message;
    private final int code;

    SubscribeException(String message, int code) {
        this.message = message;
        this.code = code;
    }
}
