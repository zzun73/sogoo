package com.ssafy.c107.main.domain.store.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum StoreException {
    STORE_NOT_FOUND("조회 가능한 매장이 없습니다.", HttpStatus.NOT_FOUND.value());

    private final String message;
    private final int code;

    StoreException(String message, int code) {
        this.message = message;
        this.code = code;
    }
}
