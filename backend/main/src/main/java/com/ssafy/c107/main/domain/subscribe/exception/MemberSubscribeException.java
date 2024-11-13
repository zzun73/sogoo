package com.ssafy.c107.main.domain.subscribe.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum MemberSubscribeException {
    MEMBER_SUBSCRIBE_NOT_FOUND("회원 구독 내역을 찾을 수 없습니다.", HttpStatus.NOT_FOUND.value()),
    CANNOT_CANCEL_AFTER_END_DATE("구독 종료 이후에는 취소할 수 없습니다.", HttpStatus.BAD_REQUEST.value()),
    SUBSCRIPTION_NOT_FOUND_FOR_MEMBER("회원과 구독 상품이 일치하지 않습니다.", HttpStatus.NOT_FOUND.value()),
    ALREADY_IN_SUBSCRIBE_CANCEL_SCHEDULED_STATUS("이미 구독 취소 예약 상태입니다.", HttpStatus.BAD_REQUEST.value());

    private final String message;
    private final int code;

    MemberSubscribeException(String message, int code) {
        this.message = message;
        this.code = code;
    }
}
