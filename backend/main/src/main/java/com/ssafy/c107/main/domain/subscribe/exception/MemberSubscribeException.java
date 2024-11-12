package com.ssafy.c107.main.domain.subscribe.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum MemberSubscribeException {
    MEMBER_SUBSCRIBE_NOT_FOUND("회원 구독 내역을 찾을 수 없습니다.", HttpStatus.NOT_FOUND.value());

    private final String message;
    private final int code;

    MemberSubscribeException(String message, int code) {
        this.message = message;
        this.code = code;
    }
}
