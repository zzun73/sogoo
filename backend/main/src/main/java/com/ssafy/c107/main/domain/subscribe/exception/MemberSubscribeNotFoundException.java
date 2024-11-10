package com.ssafy.c107.main.domain.subscribe.exception;

import lombok.Getter;

@Getter
public class MemberSubscribeNotFoundException extends RuntimeException {

    @Override
    public String getMessage() {
        return MemberSubscribeException.MEMBER_SUBSCRIBE_NOT_FOUND.getMessage();
    }

    public int getStatus() {
        return MemberSubscribeException.MEMBER_SUBSCRIBE_NOT_FOUND.getCode();
    }
}
