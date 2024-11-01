package com.ssafy.c107.main.domain.subscribe.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum SubscribeWeekException {
    SUBSCRIBE_WEEK_NOT_FOUND_EXCEPTION("해당 구독 주차를 찾지 못했습니다.", HttpStatus.NOT_FOUND.value());

    private final String message;
    private final int code;

    SubscribeWeekException(String message, int code) {
        this.message = message;
        this.code = code;
    }
}
