package com.ssafy.c107.main.domain.members.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum MemberException {
    MEMBER_NOT_FOUND("해당 멤버를 찾지 못했습니다.", HttpStatus.NOT_FOUND.value()),
    ;

    private String message;
    private int code;

    MemberException(String message, int code) {
        this.message = message;
        this.code = code;
    }
}
